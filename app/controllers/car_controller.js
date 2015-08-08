var Car = require('../models/car');
var Comment_cl = require('../models/comment.js');
var _=require('underscore');
var Category = require('../models/category.js');
var fs = require('fs');
var path = require('path');

// savePoster Midware
exports.savePoster = function(req,res,next){
	var posterData = req.files.uploadPoster;
	console.log('777777'+JSON.stringify(posterData));
	var filePath = posterData.path;
	var originalFilename = posterData.originalFilename;
	if(originalFilename){
		fs.readFile(filePath,function(err,data){
			var timestamp = Date.now();
			var type = posterData.type.split('/')[1];
			var poster = timestamp+'.'+type;
			var newPath = path.join(__dirname,'../../','/public/upload/'+poster);

			fs.writeFile(newPath,data,function(err){
				req.poster = poster;
				next();
			});

		});
	}
	else{
		next();
	}


};



exports.list = function(req,res){
		Car.fetch(function(err,cars){
			if(err){
				console.log(err);
			}
			res.render('admin/list',{
				title:'Car 列表',
				cars:cars
			})


		});

	};

exports.new = function(req,res){
		Category.find({})
		.exec(function(err,categories){

			res.render('admin/admin',{
				title:'汽车 后台录入',
				car:{},
				categories:categories
			});

		});


	};
exports.update = function(req,res){
		var id = req.params.id;
		// console.log(id);
		Car.findById(id,function(err,car){
			if(err){
				console.log(err);
			}
			res.render('admin/admin',{
				title:'Car 修改',
				car:car
			});
		});		
		// if(id){
		// 	Car.findById(id,function(err,car){
		// 		Category.find({},function(err,categories){

		// 			if(err){
		// 				console.log(err);
		// 			}
		// 			res.render('admin/admin',{
		// 				title:'Car 修改',
		// 				car:car,
		// 				categories:categories
		// 			});
		// 		});
		// 	});
		// }

	};
exports.saveNew = function(req,res){
		console.log(req.body.car);
		//bodyParser extended = true  -> is the key !!!
		var id = req.body.car._id;
		var carObj = req.body.car;
		var catId_updated = carObj.category;
		var _car;

		// if(req.poster){
		// 	carObj.poster = req.poster;
		// }

		if(id){
			Car.findById(id,function(err,car){
				if(err){
					console.log(err);
				}
				//******
				// remove old cat 
				var catId_old = car.category;
				// Category.findById(catId_old,function(err,category){
				// 	var index = category.cars.indexOf(id);
				// 	if(index>-1){

				// 		category.cars.splice(index,1);
				// 		category.save(function(err,category){
				// 			console.log(err);
				// 		});
				// 	}
				// });
				//******


				_car = _.extend(car,carObj);
				_car.save(function(err,car){
					if(err){
						console.log(err);
					}
					res.redirect('/car/'+car._id);
					//var catId = car.category;
					// Category.findById(catId_updated,function(err,category){
					// 	// then add to the new
					// 	category.cars.push(car._id);
					// 	category.save(function(err,category){
					// 		if(err){
					// 			console.log(err);
					// 		}
					// 		res.redirect('/car/'+car._id);
							
					// 	});

					// });
				});
			});

		} else {
			_car = new Car(carObj);
			// var catName = carObj.categoryName;
			// var catId = carObj.category;
			_car.save(function(err,car){
				if(err){
					console.log(err);
				}
				res.redirect('/car/'+car._id);
				// if(catId){

				// 	Category.findById(catId,function(err,category){
				// 		category.cars.push(car._id);
				// 		category.save(function(err,category){
				// 			if(err){
				// 				console.log(err);
				// 			}
				// 			res.redirect('/car/'+car._id);

				// 		});

				// 	});
				// } else if(catName){
				// 	var cat_new = new Category({
				// 		name:catName,
				// 		cars:[car._id]
				// 	});
				// 	cat_new.save(function(err,category){
				// 		car.category = category._id;
				// 		car.save(function(err,car){
				// 			if(err){
				// 				console.log(err);
				// 			}
				// 			res.redirect('/car/'+car._id);
				// 		});
				// 	});

				// }
			});
		}
	};
exports.detail = function(req,res){
		var id = req.params.id;
		//pv
		console.log( id );
		Car.update({_id:id},{$inc:{pv:1}},function(err){
			if(err){
				console.log(err);
			}
		});
		Car.findById(id,function(err,car){
			if(err){
				console.log(err);
			}
			// console.log('1111     '+car.title);
			// var carTitle ='Car '+ car.title || '';
			// Comments
			res.render('admin/detail',{
				title:'Car 详情',
				car:car
			});			
			Comment_cl.find({car:id})
				// .populate('from','name')
				// .populate('reply.from reply.to','name')
				// .exec(function(err,comments){
					
				// 	console.log(66666+JSON.stringify(comments));
				// 	res.render('admin/detail',{
				// 		title:'Car Detail',
				// 		car:car,
				// 		comments:comments
				// 	});

				// });



		});

	};

exports.del = function(req,res){
		var id = req.query.id;
		console.log('hahha '+id);
		if(id){
			Car.remove({_id:id},function(err,car){
				if(err){
					console.log(err);
				} else {
					res.json({success:1});
				}

			});

		}


};
exports.api={};
exports.api.car=function  (req,res) {
	
		var id = req.query.id;
		console.log(id);
		if(id){
			Car.findById(id,function(err,car){
				// res.send(car);
				// &callback=asdfasdf
				res.jsonp(car);
			});
		}	
}












