var Car = require('../models/car');
var Category = require('../models/category.js');
var Banner = require('../models/banner.js');
var Brands = require('../models/brands.js');
var Rank = require('../models/rank.js')
var Tag = require('../models/tags.js')
//-- index
exports.index = function(req,res){
	// new_car hot_car
	Banner.fetch(function(err,banner){
		Brands.fetch(function  (err,brands) {
			Category.getCategoryCars('new_car',function  (err,new_car) {
				Category.getCategoryCars('hot_car',function  (err,hot_car) {
					Category.getCategoryCars('unsale_car',function  (err,unsale_car) {
						Rank.fetch(function  (err,rank) {
							Tag.fetchTag(function  (err,tags) {
								// body...
								console.log(JSON.stringify(tags) );
								if(err){
									console.log(err);
								}
								res.render('index',{
									title:'首页',
									nav:'index',
									site:global.siteInfo,
									banner:banner,
									brands:brands,
									newCar:new_car.cars,
									hotCar:hot_car.cars,
									unsaleCar:hot_car.cars,
									rank:rank,
									tagCloud:JSON.stringify(tags)
								})									
							})
						})
					})					
				})
			})
		})
	});
};
