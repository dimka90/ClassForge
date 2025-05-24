import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app= express();




app.listen(3000, ()=>{
console.log(process.env.DB_NAME)
console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)
console.log(process.env.DB_HOST)
console.log(process.env.DB_PORT)
    console.log("Welcome Home");
})