import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";


const SECRET_KEY = process.env.JWT_SECRET || "12345";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied, token missing' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

