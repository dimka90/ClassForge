import express from "express";
import dotenv from "dotenv";
import adminrouter from "./routes/admin";
dotenv.config();
const app= express();


app.use(express.json())
app.use("/api/admin", adminrouter);
app.listen(3000, ()=>{
    console.log("Welcome Home");
})