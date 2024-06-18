const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    }
});

//virtual for category URL
CategorySchema.virtual('url').get(function () {
    return `/shop/category/${this._id}`;
});

CategorySchema.virtual('productCount', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'category',
    count: true
});

module.exports = mongoose.model('Category', CategorySchema);