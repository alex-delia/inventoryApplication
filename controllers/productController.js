const Product = require('../models/productSchema');
const Brand = require('../models/brandSchema');
const Category = require('../models/categorySchema');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");

//display home page
exports.index = asyncHandler(async (req, res, next) => {
    res.render('index', { title: 'Prime DJ Shop' });
});

//display list of all products
exports.product_list = asyncHandler(async (req, res, next) => {
    const allProducts = await Product.find()
        .sort({ name: 1 })
        .populate('brand')
        .populate('category')
        .exec();

    res.render('product_list', {
        title: 'Products',
        product_list: allProducts
    });
});

//display detail page for specified Product
exports.product_detail = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
        .populate('brand')
        .populate('category')
        .exec();

    if (product === null) {
        // No results.
        const err = new Error("Product not found");
        err.status = 404;
        return next(err);
    }

    res.render('product_detail', {
        title: `${product.name} Details`,
        product: product
    });
});

//display Product create form on GET
exports.product_create_get = asyncHandler(async (req, res, next) => {
    const [allBrands, allCategories] = await Promise.all([
        Brand.find().sort({ name: 1 }).exec(),
        Category.find().sort({ name: 1 }).exec()
    ]);

    res.render('product_form', {
        title: 'New Product',
        brands: allBrands,
        categories: allCategories
    });
});

//handle Product create on POST
exports.product_create_post = [
    // Convert the categories to an array.
    (req, res, next) => {
        if (!Array.isArray(req.body.category)) {
            req.body.category = typeof req.body.category === "undefined" ? [] : [req.body.category];
        }
        next();
    },

    body('name', 'Name must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('description', 'Description must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('price')
        .trim()
        .notEmpty()
        .withMessage('Price must not be empty.')
        .isNumeric()
        .withMessage('Price must be numeric.')
        .escape(),
    body('salePercentage', 'Sale Percentage must be an integer.')
        .optional({ values: "falsy" })
        .trim()
        .isInt()
        .escape(),
    body('inStock')
        .trim()
        .notEmpty()
        .withMessage('Price must not be empty.')
        .isInt()
        .withMessage('Stock must be an integer.')
        .escape(),
    body('brand', 'Brand must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('category.*')
        .escape(),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            salePercentage: req.body.salePercentage,
            inStock: req.body.inStock,
            brand: req.body.brand,
            category: req.body.category
        });

        if (!errors.isEmpty()) {
            const [allBrands, allCategories] = await Promise.all([
                Brand.find().sort({ name: 1 }).exec(),
                Category.find().sort({ name: 1 }).exec()
            ]);

             // Mark our selected genres as checked.
             for (const category of allCategories) {
                if (product.category.includes(category._id)) {
                    category.checked = "true";
                }
            }

            // There are errors. Render form again with sanitized values/errors messages.
            res.render('product_form', {
                title: 'New Product',
                product: product,
                brands: allBrands,
                categories: allCategories,
                errors: errors.array()
            });
        } else {
            // Data from form is valid.
            // Save product.
            await product.save();
            // Redirect to new product record.
            res.redirect(product.url);
        }
    })
];
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