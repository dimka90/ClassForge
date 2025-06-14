import express from "express";
import dotenv from "dotenv";
import adminrouter from "./routes/admin";
dotenv.config();
const app= express();
const PORT=process.env.PORT || '3000'

app.use(express.json())
app.use("/api/admin", adminrouter);
app.listen(PORT, ()=>{
    console.log("Welcome Home");
})
