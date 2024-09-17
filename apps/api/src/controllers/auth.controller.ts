import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env.development
dotenv.config({ path: '.env.development' });

const prisma = new PrismaClient();
const secretKey = process.env.JWT_SECRET_KEY || 'your_secret_key';
const frontendURL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Setup nodemailer for Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Define and export UserPayload
export interface UserPayload {
  id: number;
}

// Register user
export const register = async (req: Request, res: Response): Promise<Response> => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
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

    // Verification link
    const verificationLink = `${frontendURL}/verify-email?token=${emailVerifyToken}`;

    // Send verification email
    await transporter.sendMail({
      from: `"Finquill Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Verifikasi Email Anda',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="text-align: center;">Selamat Datang di Finquill, ${name}!</h2>
          <p style="text-align: center;">Terima kasih telah mendaftar. Mohon verifikasi email Anda dengan mengklik tombol di bawah ini:</p>
          <div style="text-align: center; margin-top: 20px;">
            <a href="${verificationLink}" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Verifikasi Email</a>
          </div>
          <p style="text-align: center; margin-top: 20px;">Atau salin dan tempel link ini di browser Anda: <a href="${verificationLink}">${verificationLink}</a></p>
          <p style="text-align: center; margin-top: 20px; color: #888;">Jika Anda tidak mendaftar di Finquill, abaikan email ini.</p>
        </div>
      `,
    });

    return res.status(201).json({
      message: 'User registered successfully, please verify your email',
      emailVerifyToken,
      user: { name: newUser.name, email: newUser.email, id: newUser.id },
    });
  } catch (error) {
    console.error('Error during registration:', error);
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
      return res.status(400).json({ message: 'Email atau password salah' });
    }

    // Check if email is verified
    if (!user.isEmailVerified) {
      return res.status(400).json({ message: 'Harap verifikasi email Anda sebelum login' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email atau password salah' });
    }

    // Create a token
    const token = jwt.sign({ id: user.id } as UserPayload, secretKey, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login berhasil', token, user });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Verify email
export const verifyEmail = async (req: Request, res: Response): Promise<Response> => {
  const { token } = req.query;

  try {
    // Find user by verification token
    const user = await prisma.user.findFirst({ where: { emailVerifyToken: token as string } });

    if (!user) {
      return res.status(400).json({ message: 'Token verifikasi tidak valid atau sudah kadaluarsa' });
    }

    // Verify the user
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        emailVerifyToken: null, // Remove token after verification
      },
    });

    return res.status(200).json({ message: 'Email berhasil diverifikasi' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Get current user (protected route example)
export const getCurrentUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user?.id } });
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Update phone and address (after login)
export const updateProfile = async (req: Request, res: Response): Promise<Response> => {
  const { phone, address } = req.body;
  const userId = req.user?.id;

  try {
    // Update user's phone and address
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { phone, address },
    });

    return res.status(200).json({ message: 'Profil berhasil diperbarui', user: updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};
