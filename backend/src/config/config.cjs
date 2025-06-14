require('dotenv').config();

console.log('Loading database configuration...');
// Check if the environment variables are loaded
if (!process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
  console.error('Error: Missing required environment variables for database configuration.');
  process.exit(1);
}
console.log(`DB_USER: ${process.env.DB_USER}`);
module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'time_table_planner',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    dialect: 'postgres',
    // logging: console.log,
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 }
  },
 test: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME + '_test' || 'myapp_test',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  }
};
