const Category = require('../models/categorySchema');
const Product = require('../models/productSchema');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");

//display list of all Categories
exports.category_list = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find().sort({ name: 1 }).populate('productCount').exec();

    res.render('category_list', {
        title: 'Categories',
        category_list: allCategories
    });
});

//display detail page for specified Category
exports.category_detail = asyncHandler(async (req, res, next) => {
    const [category, categoryProducts] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Product.find({ category: req.params.id }, 'name description').exec()
    ]);

    if (category === null) {
        // No results.
        const err = new Error("Brand not found");
        err.status = 404;
        return next(err);
    }

    res.render('category_detail', {
        title: `${category.name}`,
        category: category,
        category_products: categoryProducts
    });
});

//display Category create form on GET
exports.category_create_get = (req, res, next) => {
    res.render('category_form', { title: 'New Category' });
};

//handle Category create on POST
exports.category_create_post = [
    //validate and sanitize fields
    body('name')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('Name must be specified.'),
    body('description')
        .trim()
        .escape(),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        const category = new Category({
            name: req.body.name,
            description: req.body.description
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('category_form', {
                title: 'New Category',
                category: category,
                errors: errors.array()
            });
        } else {
            // Data from form is valid.

            // Save category.
            await category.save();
            // Redirect to new author record.
            res.redirect(category.url);
        }
    })

];

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