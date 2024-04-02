module.exports = {
  apps: [
    {
      name: "api",
      script: "npm",
      args: "start",
      cwd: "api/dist/src/main.js",
      env: {
        NODE_ENV: "production"
      },
      port: 3000,
    },
    {
      name: "webapp",
      script: "npm",
      args: "start",
      cwd: "webapp/",
      env: {
        NODE_ENV: "production"
      },
      port: 3800,
    },
  ]
};