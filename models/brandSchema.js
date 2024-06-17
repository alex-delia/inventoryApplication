const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BrandSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

//virtual for brand URL
BrandSchema.virtual('url').get(function () {
    return `/shop/brand/${this._id}`;
});

module.exports = mongoose.model('Brand', BrandSchema);