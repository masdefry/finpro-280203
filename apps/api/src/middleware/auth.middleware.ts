import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../controllers/auth.controller';

const secretKey = process.env.JWT_SECRET_KEY || 'your_secret_key';

// Middleware to authenticate token
export const authUser = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    console.log("No authorization header found");
    return res.status(401).json({ status: 'error', message: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    console.log("No token found in the authorization header");
    return res.status(401).json({ status: 'error', message: 'Invalid token format, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, secretKey) as UserPayload;
    req.user = decoded;
    console.log("Token valid, user:", decoded); // Log for debugging
    next();
  } catch (err) {
    console.log("Token verification failed", err);
    return res.status(401).json({ status: 'error', message: 'Token is not valid or has expired' });
  }
};

