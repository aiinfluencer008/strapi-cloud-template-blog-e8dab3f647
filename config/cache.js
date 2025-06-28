module.exports = ({ env }) => ({
  config: {
    provider: 'cache-manager-ioredis',
    providerOptions: {
      host: env('REDIS_HOST', 'localhost'),
      port: env.int('REDIS_PORT', 6379),
      password: env('REDIS_PASSWORD', null),
      db: env.int('REDIS_DB', 0),
      keyPrefix: env('REDIS_PREFIX', 'strapi:'),
      retryDelayOnFailover: 100,
      maxRetriesPerRequest: 1,
    },
  },
}); 