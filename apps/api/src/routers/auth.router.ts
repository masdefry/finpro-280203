import { Router } from 'express';
import { register, login, getCurrentUser, verifyEmail, updateProfile } from '../controllers/auth.controller'; 
import { validateRegister, validateLogin } from '../middleware/auth.validation';
import { authUser } from '../middleware/auth.middleware';

const authRouter: Router = Router(); 

// Register route
authRouter.post('/register', validateRegister, register);

// Login route
authRouter.post('/login', validateLogin, login);

// Verifikasi email
authRouter.get('/verify-email', verifyEmail);

// Protected route example to get current user
authRouter.get('/me', authUser, getCurrentUser);

// Update profile (phone and address) after login
authRouter.put('/update-profile', authUser, updateProfile); 

export default authRouter;
