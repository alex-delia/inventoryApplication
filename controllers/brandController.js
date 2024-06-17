const Brand = require('../models/brandSchema');

const asyncHandler = require('express-async-handler');

//display list of all Brands
exports.brand_list = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Brand List');
});

//display detail page for specified Brand
exports.brand_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Brand Detail: ${req.params.id}`);
});

//display Brand create form on GET
exports.brand_create_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Brand Create GET');
});

//handle Brand create on POST
exports.brand_create_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Brand Create POST');
});

//display Brand delete form on GET
exports.brand_delete_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Brand Delete GET');
});

//handle Brand delete on POST
exports.brand_delete_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Brand Delete POST');
});

//display Brand update form on GET
exports.brand_update_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Brand Update GET');
});

//handle Brand update on POST
exports.brand_update_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Brand Update POST');
});