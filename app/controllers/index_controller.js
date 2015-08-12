var Car = require('../models/car');
var Category = require('../models/category.js');
var Banner = require('../models/banner.js');
var Brands = require('../models/brands.js');
//-- index
exports.index = function(req,res){
	// top_sell top_hot
		Banner.fetch(function(err,banner){
			Brands.fetch(function  (err,brands) {
				Category.getCategoryCars('top_sell',function  (err,top_sell) {
					Category.getCategoryCars('top_hot',function  (err,top_hot) {
						if(err){
							console.log(err);
						}
						res.render('index',{
							title:'首页',
							site:global.siteInfo,
							banner:banner,
							brands:brands,
							top:top_sell.cars,
							hot:top_hot.cars
						})						
					})
				})
			})
		});
};
