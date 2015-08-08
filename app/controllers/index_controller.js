var Car = require('../models/car');
var Category = require('../models/category.js');
var Banner = require('../models/banner.js');
var Brands = require('../models/brands.js');
var Car = require('../models/car');
//-- index
exports.index = function(req,res){
		Banner.fetch(function(err,banner){
			if(err){
				console.log(err);
			}
			Brands.fetch(function  (err,brands) {
				Car.top(function  (err,cars) {
					res.render('index',{
						title:'首页',
						banner:banner,
						brands:brands,
						top:cars
					})						
				})
			
			})

		});
};
// exports.search = function(req,res){
// 	// console.log('Session !!!');
// 	// console.log(req.session.user);
// 	var catId = req.query.cat;
// 	var q = req.query.q;
// 	// console.log('66666');
// 	// console.log(q);

// 	var page = parseInt(req.query.p) || 0;
// 	var count = 3;
// 	var index = page * count;

// 	if(catId){
// 		console.log('hihi');
// 		Category.find({_id:catId})
// 			.populate({path:'cars'
// 				// ,options:{limit:count,skip:index}
// 			})
// 			.exec(function(err,categories){

// 				if(err){
// 					console.log(err);
// 				}
// 				// console.log(categories);
// 				var category = categories[0];
// 				var cars = category.cars || [];
// 				var results = cars.slice(index,index+count);
// 				var totalPage = cars.length / count;


// 				res.render('results',{
// 					title:'Results',
// 					cars: results,
// 					keyword:category.name,
// 					currentPage : page+1,
// 					totalPage: Math.ceil(totalPage),
// 					query: 'cat='+catId

// 				});
// 			});
// 	} else{
// 		console.log('hohohoo');
// 		var q_reg = new RegExp(q+'.*','i');	
// 		console.log(q_reg);
// 		Car.find({title:q_reg})
// 			.exec(function(err,cars){
// 				if(err){
// 					console.log(err);
// 				}
// 				var results = cars.slice(index,index+count);
// 				var totalPage = cars.length / count;
// 				// console.log(cars.length);
// 				// console.log(totalPage);

// 				res.render('results',{
// 					title:'Search Results',
// 					cars: results,
// 					keyword:q,
// 					currentPage : page+1,
// 					totalPage: Math.ceil(totalPage),
// 					query: 'q='+q

// 				});				

// 			});
// 	}



// };