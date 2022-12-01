export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  dbUri: process.env.DATABASE_URI,
});
