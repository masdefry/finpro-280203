import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();
const secretKey = process.env.JWT_SECRET || 'your_secret_key';
const frontendURL = process.env.FRONTEND_URL || 'http://localhost:3000';

export interface UserPayload {
  id: number;
  role: string;
}

// Register user
export const register = async (req: Request, res: Response): Promise<Response> => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const emailVerifyToken = crypto.randomBytes(32).toString('hex');

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        emailVerifyToken,
      },
    });

    // Log verification link for fake email use case
    const verificationLink = `${frontendURL}/verify-email?token=${emailVerifyToken}`;
    console.log(`Verification link: ${verificationLink}`);

    return res.status(201).json({ message: 'User registered successfully, please verify your email', emailVerifyToken, user: { name: newUser.name, email: newUser.email, id: newUser.id } });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Login user
export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Cek apakah email sudah diverifikasi
    if (!user.isEmailVerified) {
      return res.status(400).json({ message: 'Please verify your email before logging in' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create a token
    const token = jwt.sign({ id: user.id, role: user.role } as UserPayload, secretKey, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Verifikasi email
export const verifyEmail = async (req: Request, res: Response): Promise<Response> => {
  const { token } = req.query;

  try {
    // Cari user berdasarkan token
    const user = await prisma.user.findFirst({ where: { emailVerifyToken: token as string } });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification token' });
    }

    // Verifikasi user
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        emailVerifyToken: null, // Hapus token setelah verifikasi
      },
    });

    return res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Get current user (protected route example)
export const getCurrentUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user?.id } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};
