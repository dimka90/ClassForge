import { Sequelize } from "sequelize";
// import dotenv from 'dotenv';

import * as dotenv from 'dotenv';
dotenv.config();


console.log(process.env.DB_NAME)
console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)

const sequelize = new Sequelize(
    process.env.DB_NAME || 'root',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '1234',
    {
        host: process.env.DB_HOST,
        dialect: "postgres",
        logging: true
    }

)

sequelize
.authenticate()
.then(()=> console.log("Database connected succesfully"))
.catch(()=> console.log("Failed to establish connection"))


export default sequelize