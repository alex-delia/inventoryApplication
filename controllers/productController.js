const Product = require('../models/productSchema');

const asyncHandler = require('express-async-handler');

//display home page
exports.index = asyncHandler(async (req, res, next) => {
    res.render('index', { title: 'Prime DJ Shop' });
});

//display list of all products
exports.product_list = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Product List');
});

//display detail page for specified Product
exports.product_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Product Detail: ${req.params.id}`);
});

//display Product create form on GET
exports.product_create_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Product Create GET');
});

//handle Product create on POST
exports.product_create_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Product Create POST');
});

//display Product delete form on GET
exports.product_delete_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Product Delete GET');
});

//handle Product delete on POST
exports.product_delete_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Product Delete POST');
});

//display Product update form on GET
exports.product_update_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Product Update GET');
});

//handle Product update on POST
exports.product_update_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Product Update POST');
});