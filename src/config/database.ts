import dotenv from 'dotenv'

dotenv.config();

const {
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
} = process.env;



const config = {
  development: {
    username: DB_USER || 'postgres',
    password: DB_PASSWORD || 'password',
    database: DB_NAME || 'time_table_planner',
    host: DB_HOST || 'localhost',
    port: parseInt(DB_PORT || '5432'),
    dialect: 'postgres' as const,
    logging: console.log,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  test: {
    username: DB_USER || 'postgres',
    password: DB_PASSWORD || 'password',
    database: `${DB_NAME || 'time_table_planner'}_test`,
    host: DB_HOST || 'localhost',
    port: parseInt(DB_PORT || '5432'),
    dialect: 'postgres' as const,
    logging: false
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres' as const,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false,
    pool: {
      max: 20,
      min: 5,
      acquire: 30000,
      idle: 10000
    }
  }
};

export default config;