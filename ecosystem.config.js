module.exports = {
  apps: [
    {
      name: "yukichi-backend",
      script: "./backend/src/server.js",
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "development",
        PORT: 3001
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3001
      }
    }
  ]
};
