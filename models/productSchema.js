const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    inStock: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true,
    },
    category: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
    }],
    salePercentage: {
        type: Number,
        min: 0,
        max: 75,
        default: 0,
        required: true
    },
});

//virtual for product URL
ProductSchema.virtual('url').get(function () {
    return `/shop/product/${this._id}`;
});

ProductSchema.virtual('isOnSale').get(function () {
    return this.salePercentage > 0 ? true : false;
});

module.exports = mongoose.model('Product', ProductSchema);