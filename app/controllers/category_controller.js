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
				categories:categories
			})


		});

	};

exports.new = function(req,res){
		
	Car.page(0,10,function  (err,car) {
		res.render('cms/category',{
			title:'数据集设置',
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
			Car.getCarsById(category.cars,function  (err,cateCar) {
				res.render('cms/category',{
					title:'数据集 修改',
					car:car,
					cateCar:cateCar,
					category:category
				});					
			})
		});	
	});
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
console.log( categoryObj );
		if(id){
			Category.findById(id,function  (err,category) {
				// body...

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













