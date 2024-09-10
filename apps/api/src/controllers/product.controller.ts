import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true, // Assuming you want to include category data as well
      },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Get a product by ID
export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        category: true,
      },
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, categoryId, imageUrl } = req.body;
  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        categoryId: Number(categoryId),
        imageUrl, // Include the imageUrl field when creating the product
      },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};

// Update a product by ID
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price, categoryId, imageUrl } = req.body;
  try {
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        price: parseFloat(price),
        categoryId: Number(categoryId),
        imageUrl, // Ensure the imageUrl is updated
      },
    });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// Delete a product by ID
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
