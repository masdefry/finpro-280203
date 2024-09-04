import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../controllers/auth.controller';

const secretKey = process.env.JWT_SECRET || 'your_secret_key';

// Middleware to authenticate token
export const authUser = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    return res.status(401).json({ status: 'error', message: 'No token, authorization denied' });
  }

  // Extract token from the header (format: Bearer <token>)
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ status: 'error', message: 'Invalid token format, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey) as UserPayload;

    // Attach user data to the request object
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (err) {
    return res.status(401).json({ status: 'error', message: 'Token is not valid or has expired' });
  }
};
