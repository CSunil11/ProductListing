// filename : productListing.js

const mongoose = require('mongoose');
const { Products, Category } = require('./model');

app.get ('/products', function(req, res)) {
	
	try {
		const { query } = req.query.split('-');
		var col, size, quantity;
		if(query.length > 2) {
			col = query[0];
			size = query[1];
			quantity = query[2];	
		}

		var quantArray = quantity.split(' ');
		var sizeArray = size.split(' ');
		var totalPrice = 0;
		var quantGtFiveFlag = false;
		var discount = 0;

		// Filter products based on size and available quanity 
		var result = Products.find({color : col}, {size : {$in: size.split(' ')}}, {quantity : {$in: quantArray}});

		// calculate total price
		for(var i=0;i<sizeArray.length;i++){
			var prRes = Products.find({color : col}, {size : {$in: sizeArray[i]}}, {quantity : 1});
			if(prRes !== undefined and prRes !== null) {
				totalPrice = totalPrice + (prRes.price*quantArray[i]);
			}
		}

		// calculate discount
		for(var i=0;i<quantArray.length >0 && !quantGtFiveFlag;i++){
			if(quantArray[i] > 5){
				discount = totalPrice*0.1;
				quantGtFiveFlag = true;
			}
		}

		// conditional discount
		if(discount > 100) {
			discount = 100;
		}

		// final price of cart value including discount
		totalPrice = totalPrice - discount;
		result.totalPrice = totalPrice;

		// returning all product details
		return res.status(200).json(result);

	} catch (err) {
		return res.status(err.code).json({error: err.code});
	}

}


app.get ('/clothes', function(req, res)) {
	
	try {
		const { catName } = req.query;
		
		const result = await Category.find({category_name : catName});
		return res.status(200).json(result);

	} catch (err) {
		return res.status(err.code).json({error: err.code});
	}

}