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
        const err = new Error("Category not found");
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
            // Redirect to new category record.
            res.redirect(category.url);
        }
    })
];

//display Category delete form on GET
exports.category_delete_get = asyncHandler(async (req, res, next) => {
    const [category, existingProducts] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Product.find({ category: req.params.id }).populate('brand').exec()
    ]);

    if (category === null) {
        res.redirect('/shop/categories');
    }

    res.render('category_delete', {
        title: 'Delete Category',
        category: category,
        existingProducts: existingProducts
    });
});

//handle Category delete on POST
exports.category_delete_post = asyncHandler(async (req, res, next) => {
    const [category, existingProducts] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Product.find({ category: req.params.id }).populate('brand').exec()
    ]);


    if (existingProducts.length > 0) {
        //if there are still products in this category they must be deleted first
        res.render('category_delete', {
            title: 'Delete Category',
            category: category,
            existingProducts: existingProducts
        });
    } else {
        await Category.findByIdAndDelete(req.params.id).exec();
        res.redirect('/shop/categories');
    }
});

//display Category update form on GET
exports.category_update_get = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id).exec();

    if (category === null) {
        //no results
        const err = new Error('Category Not Found');
        err.status = 404;
        return next(err);
    }

    res.render('category_form', {
        title: 'Update Category',
        category: category
    });
});

//handle Category update on POST
exports.category_update_post = [
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
            description: req.body.description,
            _id: req.params.id
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('category_form', {
                title: 'Update Category',
                category: category,
                errors: errors.array()
            });
        } else {
            // Data from form is valid.

            // Save category.
            await Category.findByIdAndUpdate(req.params.id, category, {});
            // Redirect to new category record.
            res.redirect(category.url);
        }
    })
];