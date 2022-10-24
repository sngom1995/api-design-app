import { Router } from 'express';
import { body, oneOf } from 'express-validator';
import { validationResult } from 'express-validator/src/validation-result';
import { handleInputErrors } from './modules/middleware';
import { updateProduct } from './handlers/product';
import {
	createProduct,
	getOneProduct,
	getProducts,
	deleteProduct,
} from './handlers/product';

const router = Router();

/**
 * Product
 */
router.get('/product', getProducts);
router.get('/product/:id', getOneProduct);
router.put(
	'/product/:id',
	body('name').isString(),
	handleInputErrors,
	updateProduct
);
router.post(
	'/product',
	body('name').isString(),
	handleInputErrors,
	createProduct
);
router.delete('/product/:id', deleteProduct);
/**
 * Update
 */
router.get('/update', (req, res) => {});
router.get('/update/:id', (req, res) => {});
router.put('/update/:id', (req, res) => {});
router.post(
	'/update',
	body('title').exists().isString(),
	body('body').exists().isString(),
	body('productId').exists().isString(),
	handleInputErrors,
	createProduct,
	(req, res) => {}
);
router.delete('/update/:id', (req, res) => {});
/**
 * Update Point
 */
router.get('/updatepoint', (req, res) => {});
router.get('/updatepoint/:id', (req, res) => {});
router.put(
	'/updatepoint/:id',
	body('name').optional().isString(),
	body('description').optional().isString(),
	(req, res) => {}
);
router.post('/updatepoint', (areq, res) => {});
router.delete(
	'/updatepoint/:id',
	body('name').isString(),
	body('description').isString(),
	body('updateId').exists().isString(),
	(req, res) => {}
);

router.use((err, req, res, next) => {
	console.log(err);
	res.json({ message: 'in router handler' });
});

export default router;
