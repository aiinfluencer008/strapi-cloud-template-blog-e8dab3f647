const redis = require('../../lib/redis');

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    // Only cache GET requests to /api/*
    if (ctx.method === 'GET' && ctx.path.startsWith('/api/')) {
      const cacheKey = `restcache:${ctx.path}${ctx.search || ''}`;
      try {
        const cached = await redis.get(cacheKey);
        if (cached) {
          ctx.set('X-Cache', 'HIT');
          ctx.body = JSON.parse(cached);
          return;
        }
      } catch (err) {
        // Redis not available, log and continue
        strapi.log.warn('Redis GET failed:', err.message);
      }

      await next();

      // Only cache successful responses
      if (ctx.status === 200 && ctx.body) {
        try {
          await redis.set(cacheKey, JSON.stringify(ctx.body), 'EX', 60); // cache for 60 seconds
          ctx.set('X-Cache', 'MISS');
        } catch (err) {
          // Redis not available, log and continue
          strapi.log.warn('Redis SET failed:', err.message);
        }
      }
    } else {
      await next();
    }
  };
}; 