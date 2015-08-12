var Car = require('../models/car');
var Category = require('../models/category.js');
var _=require('underscore');


exports.list = function(req,res){
		Category.fetch(function(err,categories){
			if(err){
				console.log(err);
			}
			res.render('cms/category_list',{
				title:'数据集 列表',
				site:global.siteInfo,
				categories:categories
			})


		});

	};

exports.new = function(req,res){
		
	Car.page(0,10,function  (err,car) {
		res.render('cms/category',{
			title:'数据集设置',
			site:global.siteInfo,
			category:{},
			car:car
		});		
	})
};
exports.update = function(req,res){
	var id = req.params.id;
	// console.log(id);
	Car.page(0,10,function  (err,car) {	
		Category.findById(id,function(err,category){
			Category.getCategoryCars(category.code,function  (err,cateCar) {
				res.render('cms/category',{
					title:'数据集 修改',
					site:global.siteInfo,
					car:car,
					cateCar:cateCar.cars,
					category:category
				});					
			})
		});	
	});	
	// Car.page(0,10,function  (err,car) {	
	// 	Category.findById(id,function(err,category){
	// 		Car.getCarsById(category.cars,function  (err,cateCar) {
	// 			// why：为啥  category.cars【0】 不是string 也不是 number
	// 			// _.indexOf(category.cars, item._id.toString() )
	// 			var carSort=[];
	// 			_.each(cateCar,function  (item) {
	// 				_.each(category.cars,function  (m,n) {
	// 					if(m.toString()==item._id.toString()){
	// 						carSort[n]=item;
	// 						return;
	// 					}
	// 				})					
	// 			});
	// 			res.render('cms/category',{
	// 				title:'数据集 修改',
	// 				car:car,
	// 				cateCar:carSort,
	// 				category:category
	// 			});					
	// 		})
	// 	});	
	// });
};	
// exports.adminList = function(req,res){
// 		var id = req.params.id;
// 		console.log(id);
// 		if(id){
// 			Car.findById(id,function(err,movie){
// 				if(err){
// 					console.log(err);
// 				}
// 				res.render('admin',{
// 					title:'Moive 后台',
// 					movie:movie
// 				});
// 			});
// 		}

// 	};
exports.saveNew = function(req,res){
	//console.log(req.body.movie);
	//bodyParser extended = true  -> is the key !!!
	var categoryObj = req.body.category;
	var id = categoryObj._id;
	var _category;
	if(id){
		Category.findById(id,function  (err,category) {
			_category=_.extend(category,categoryObj)
			_category.cars=categoryObj.cars;
			_category.save(function  (err) {
				res.redirect('/cms/category/list');
			})
		})
	}else{
		_category = new Category(categoryObj);
		_category.save(function(err,category){
			if(err){
				console.log(err);
			}
			res.redirect('/cms/category');
		});
	}
};

exports.del = function(req,res){
		var id = req.query.id;
		if(id){
			Car.remove({_id:id},function(err,movie){
				if(err){
					console.log(err);
				} else {
					res.json({success:1});
				}

			});

		}


};













