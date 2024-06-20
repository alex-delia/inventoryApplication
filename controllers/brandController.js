const Brand = require('../models/brandSchema');
const Product = require('../models/productSchema');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");

//display list of all Brands
exports.brand_list = asyncHandler(async (req, res, next) => {
    const allBrands = await Brand.find().sort({ name: 1 }).populate('productCount').exec();

    res.render('brand_list', {
        title: 'All Brands',
        brand_list: allBrands
    });
});

//display detail page for specified Brand
exports.brand_detail = asyncHandler(async (req, res, next) => {
    const [brand, brandProducts] = await Promise.all([
        Brand.findById(req.params.id),
        Product.find({ brand: req.params.id }, 'name description').exec()
    ]);

    if (brand === null) {
        // No results.
        const err = new Error("Brand not found");
        err.status = 404;
        return next(err);
    }

    res.render('brand_detail', {
        title: `${brand.name} Details`,
        brand: brand,
        brand_products: brandProducts
    });
});

//display Brand create form on GET
exports.brand_create_get = (req, res, next) => {
    res.render('brand_form', { title: 'New Brand' });
};

//handle Brand create on POST
exports.brand_create_post = [
    //validate and sanitize fields
    body('name')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('Name must be specified.'),
    body('description')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('Description must be specified.'),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        const brand = new Brand({
            name: req.body.name,
            description: req.body.description
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('brand_form', {
                title: 'New Brand',
                brand: brand,
                errors: errors.array()
            });
        } else {
            // Data from form is valid.

            // Save brand.
            await brand.save();
            // Redirect to new brand record.
            res.redirect(brand.url);
        }
    })
];

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
    const brand = await Brand.findById(req.params.id).exec();

    if (brand === null) {
        //no results
        const err = new Error('Brand Not Found');
        err.status = 404;
        return next(err);
    }

    res.render('brand_form', {
        title: 'Update Brand',
        brand: brand
    });
});

//handle Brand update on POST
exports.brand_update_post = [
    //validate and sanitize fields
    body('name')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('Name must be specified.'),
    body('description')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('Description must be specified.'),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        const brand = new Brand({
            name: req.body.name,
            description: req.body.description,
            _id: req.params.id
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('brand_form', {
                title: 'Update Brand',
                brand: brand,
                errors: errors.array()
            });
        } else {
            // Data from form is valid.

            // Save category.
            await Brand.findByIdAndUpdate(req.params.id, brand, {});
            // Redirect to new category record.
            res.redirect(brand.url);
        }
    })
];