// File name : model.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	product_name: String,
	category_name: String,
	price: Number,
	discount: Number,
	color: String,
	size: String,
	quantity: String,
	weight: Number,
	deliveryCharge: Number
})

const categorySchema = new mongoose.Schema({
	category_name: String,
	category_id: Number
})

const Category = mongoose.model('Category', categorySchema);
const Products = mongoose.model('Products', productSchema);

module.exports = {
	Products, Category
}
