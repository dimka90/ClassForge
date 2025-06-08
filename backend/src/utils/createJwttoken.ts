
import jwt from "jsonwebtoken";
import { AdminDetails } from "../types/admindetails";
import dotenv from "dotenv";
dotenv.config()
export async function createToken(payload: AdminDetails): Promise<string>{
let secret =jwt.sign(payload, process.env.JWT_SECRET!, {"expiresIn": "1h"});

return secret
}