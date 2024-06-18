const Category = require('../models/categorySchema');

const asyncHandler = require('express-async-handler');

//display list of all Categories
exports.category_list = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find({}, 'name');

    res.render('category_list', {
        title: 'Categories',
        category_list: allCategories
    });
});

//display detail page for specified Category
exports.category_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Category Detail: ${req.params.id}`);
});

//display Category create form on GET
exports.category_create_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Category Create GET');
});

//handle Category create on POST
exports.category_create_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Category Create POST');
});

//display Category delete form on GET
exports.category_delete_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Category Delete GET');
});

//handle Category delete on POST
exports.category_delete_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Category Delete POST');
});

//display Category update form on GET
exports.category_update_get = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Category Update GET');
});

//handle Category update on POST
exports.category_update_post = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Category Update POST');
});