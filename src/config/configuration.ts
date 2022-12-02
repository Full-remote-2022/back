export default () => ({
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  dbUri: process.env.APP_DATABASE_URI,
  jwtSecret: process.env.APP_JWT_SECRET,
});
