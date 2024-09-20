module.exports = {
  apps: [
    {
      name: "bill-sender-app",
      script: "./build/src/bill-app.js",
      env: {
        NODE_ENV: "development",
        DB_HOST: "localhost",
        DB_USER: "root",
        DB_PASS: "example",
      },
      env_production: {
        PORT: 8888,
        HOST: "microtech.icu",
        SMTP_SERVER: "smtp.mailersend.net",
        SMTP_PORT: 587,
        SMTP_LOGIN: "MS_xJlnpH@microtech.icu",
        SMTP_PASSWORD: "3DxIp0kA1aIaPuvu",
        DB_HOST: "localhost",
        DB_PORT: 3307,
        DB_USER: "root",
        DB_PASSWORD: "my-password",
        DATABASE: "MICROTECH",
      },
    },
  ],
};
