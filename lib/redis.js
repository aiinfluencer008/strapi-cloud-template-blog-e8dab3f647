const Redis = require('ioredis');

const redis = new Redis(process.env.REDIS_URL,{family:0});

module.exports = redis; 