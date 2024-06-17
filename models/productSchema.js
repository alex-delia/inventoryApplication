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
    sale: {
        isOnSale: { type: Boolean, default: false },
        salePercentage: {
            type: Number,
            min: function () {
                return this.isOnSale ? 5 : 0;
            },
            max: 75,
            default: function () {
                return this.isOnSale ? 10 : 0;
            },
            required: function () {
                return this.isOnSale;
            }
        },
    },
});

//virtual for product URL
ProductSchema.virtual('url').get(function () {
    return `/shop/products/${this._id}`;
});

module.exports = mongoose.model('Product', ProductSchema);