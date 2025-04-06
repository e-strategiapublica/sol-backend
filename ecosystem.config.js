module.exports = {
  apps: [
    {
      name: "sol-backend",
      script: "dist/main.js",
      env: {
        NODE_ENV: "staging",
      },
    },
  ],
};
