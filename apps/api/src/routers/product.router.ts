import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller';

const router = Router();

// Get all products
router.get('/products', getAllProducts);

// Get a product by ID
router.get('/products/:id', getProductById);

// Create a new product
router.post('/products', createProduct);

// Update a product by ID
router.put('/products/:id', updateProduct);

// Delete a product by ID
router.delete('/products/:id', deleteProduct);

export default router;
