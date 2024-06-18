const express = require('express');
const router = express.Router();

//require controller modules
const product_controller = require('../controllers/productController');
const brand_controller = require('../controllers/brandController');
const category_controller = require('../controllers/categoryController');

/// PRODUCT ROUTES ///

//GET catalog home page
router.get('/', product_controller.index);

//GET request for creating a product
router.get('/product/create', product_controller.product_create_get);
//POST request for creating a product
router.post('/product/create', product_controller.product_create_post);

//GET request for deleting a product
router.get('/product/:id/delete', product_controller.product_delete_get);
//POST request for deleting a product
router.post('/product/:id/delete', product_controller.product_delete_post);

//GET request for updating a product
router.get('/product/:id/update', product_controller.product_update_get);
//POST request for updating a product
router.post('/product/:id/update', product_controller.product_update_post);

//GET request for one product
router.get('/product/:id', product_controller.product_detail);

//GET request for list of all products
router.get('/products', product_controller.product_list);


/// BRAND ROUTES ///

//GET request for creating a brand
router.get('/brand/create', brand_controller.brand_create_get);
//POST request for creating a brand
router.post('/brand/create', brand_controller.brand_create_post);

//GET request for deleting a brand
router.get('/brand/:id/delete', brand_controller.brand_delete_get);
//POST request for deleting a brand
router.post('/brand/:id/delete', brand_controller.brand_delete_post);

//GET request for updating a brand
router.get('/brand/:id/update', brand_controller.brand_update_get);
//POST request for updating a brand
router.post('/brand/:id/update', brand_controller.brand_update_post);

//GET request for one brand
router.get('/brand/:id', brand_controller.brand_detail);

//GET request for list of all brands
router.get('/brands', brand_controller.brand_list);


/// CATEGORY ROUTES ///

//GET request for creating a category
router.get('/category/create', category_controller.category_create_get);
//POST request for creating a category
router.post('/category/create', category_controller.category_create_post);

//GET request for deleting a category
router.get('/category/:id/delete', category_controller.category_delete_get);
//POST request for deleting a category
router.post('/category/:id/delete', category_controller.category_delete_post);

//GET request for updating a category
router.get('/category/:id/update', category_controller.category_update_get);
//POST request for updating a category
router.post('/category/:id/update', category_controller.category_update_post);

//GET request for one category
router.get('/category/:id', category_controller.category_detail);

//GET request for list of all categories
router.get('/categories', category_controller.category_list);

module.exports = router;