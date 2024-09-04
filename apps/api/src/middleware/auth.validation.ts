import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

// Schema validation untuk pendaftaran (register)
const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': `"name" should be a type of 'text'`,
    'string.empty': `"name" cannot be an empty field`,
    'string.min': `"name" should have a minimum length of {#limit}`,
    'string.max': `"name" should have a maximum length of {#limit}`,
    'any.required': `"name" is a required field`
  }),
  email: Joi.string().email().required().messages({
    'string.email': `"email" must be a valid email`,
    'any.required': `"email" is a required field`
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': `"password" should have a minimum length of {#limit}`,
    'any.required': `"password" is a required field`
  }),
});

// Schema validation untuk login
const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': `"email" must be a valid email`,
    'any.required': `"email" is a required field`
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': `"password" should have a minimum length of {#limit}`,
    'any.required': `"password" is a required field`
  }),
});

// Middleware untuk validasi pendaftaran (register)
export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ status: 'error', message: error.details[0].message });
  }
  next();
};

// Middleware untuk validasi login
export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ status: 'error', message: error.details[0].message });
  }
  next();
};
