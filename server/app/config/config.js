import dotenv from 'dotenv';

dotenv.config();
const config = {
  development: {
    url: process.env.DATABASE_DEVELOPMENT_URL,
    dialect: 'postgres'
  },
  production: {
    url: process.env.DATABASE_PRODUCTION_URL,
    dialect: 'postgres'
  },
  staging: {
    url: process.env.DATABASE_STAGING_URL,
    dialect: 'postgres'
  },
  test: {
    url: process.env.DATABASE_STAGING_TEST || 'postgres://postgres:password@localhost:5432/dms-test',
    dialect: 'postgres'
  }
};

export default config;
