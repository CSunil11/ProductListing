// File name : model.js

const db = require('./mongodb');

const productSchema = new db.Schema({
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

const categorySchema = new db.Schema({
	category_name: String,
	category_id: Number
})

const Category = db.model('Category', categorySchema);
const Products = db.model('Products', productSchema);

module.exports = {
	Products, Category
}
