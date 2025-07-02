module.exports = ({ env }) => ({
    'redis': {
      enabled: true,
      config: {
        connections: {
          default: {
            connection: {
              host: env('REDIS_HOST'),
              port: env('REDIS_PORT'),
              password: env('REDIS_PASSWORD'),
              db: 0,
            },
          },
        },
      },
    },
  });