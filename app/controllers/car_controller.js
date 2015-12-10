var _=require('underscore');
var fs = require('fs');
var path = require('path');
// var async = require('async');
var Car = require('../models/car');
// var Comment_cl = require('../models/comment.js');
var Tags = require('../models/tags.js');

// savePoster Midware
exports.savePoster = function(req,res,next){
	var posterData = req.files.uploadPoster;
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
			site:global.siteInfo,
			cars:cars
		})
	});

};

exports.new = function(req,res){
		Tags.find({})
		.exec(function(err,tags){
			res.render('admin/admin',{
				title:'汽车 后台录入',
				site:global.siteInfo,
				car:{},
				tags:tags
			});

		});
	};
// exports.update = function(req,res){
// 	var id = req.params.id;
// 	var data={
// 			title:'Car 修改'
// 	};
// 	async.auto({
// 		Tags:function  (cb) {
// 			Tags.fetch(function(err,tags){	
// 				data.tags=tags;
// 			})
// 		},
// 		Car:function  (cb) {
// 			Car.findById(id,function(err,car){
// 				data.car=car;
// 			})
// 		},
// 		tagCar:['Tags','Car',function  (cb) {
// 			Tags.getTag(data.car.tag,function  (err,tagCar) {
// 				res.render('admin/admin',data);					
// 			})				
// 		}]
// 	})
// };	
exports.delete = function  (req,res,next) {
	var id = req.query.id;
	Car.delete(id,function  (err,data) {
		res.send({err:0});
	})	
}	
exports.update = function(req,res){
	var id = req.params.id;
	// console.log(id);
	Tags.fetch(function(err,tags){	
		Car.findById(id,function(err,car){
			Tags.getTag(car.tag,function  (err,tagCar) {
				if(err){
					console.log(err);
				}
				res.render('admin/admin',{
					title:'Car 修改',
					site:global.siteInfo,
					car:car,
					tagCar:tagCar,
					tags:tags
				});					
			})
		});	
	});
};				

exports.saveNew = function(req,res){
		var id = req.body.car._id;
		var carObj = req.body.car;
		var _car;

		if(id){
			Car.findById(id,function(err,car){
				if(err){
					console.log(err);
				}
				_car = _.extend(car,carObj);
				_car.save(function(err,car){
					if(err){
						console.log(err);
					}
					res.redirect('/car/'+car._id);
				});
			});

		} else {
			_car = new Car(carObj);
			_car.save(function(err,car){
				if(err){
					console.log(err);
				}
				res.redirect('/car/'+car._id);
			});
		}
	};
exports.detail = function(req,res){
		var id = req.params.id;
		//pv
		Car.update({_id:id},{$inc:{pv:1}},function(err){
			if(err){
				console.log(err);
			}
		});
		Car.findById(id,function(err,car){
			if(err){
				console.log(err);
			}
			res.render('detail',{
				title:'Car 详情',
				site:global.siteInfo,
				car:car
			});			
		});
};

exports.del = function(req,res){
		var id = req.query.id;
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
		var s=req.query.s;
		if(id){
			Car.findById(id,function(err,car){
				res.jsonp(car);
			});
		}
		if(s){
			Car.search(s,function  (err,car) {
				console.log('carlist', car );
				// res.jsonp(car)
				res.render('api/carlist',{
					car:car
				});					
			})
		}
}












