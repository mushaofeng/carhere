var Car = require('../models/car');
var Brands = require('../models/brands.js');
var _=require('underscore');


exports.list = function(req,res){
		Brands.fetch(function(err,brands){
			if(err){
				console.log(err);
			}
			res.render('admin/brands_list',{
				title:'Cat 列表',
				brands:brands
			})


		});

	};

exports.new = function(req,res){
		

		res.render('admin/brands',{
			title:'汽车品牌',
			brands:{
			// 	// director:'hihi',
			// 	// title:'hoho',
			// 	// language:'EN',
			// 	// country:'CN',
			// 	// summary:'catcat',
			// 	// flash:'http://player.youku.com/player.php/sid/XMTI2NjA4MzU1Ng==/v.swf',
			// 	// poster:'http://img4.duitang.com/uploads/item/201207/08/20120708234648_dwQuG.thumb.600_0.jpeg',
			// 	// year:2010
				
			}
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
// 				res.render('admin/admin',{
// 					title:'Moive 后台',
// 					movie:movie
// 				});
// 			});
// 		}

// 	};
exports.saveNew = function(req,res){
		//console.log(req.body.movie);
		//bodyParser extended = true  -> is the key !!!
		var brandsObj = req.body.brands;
		var id=brandsObj._id;
		var _brands;
		if(id){
			Brands.findById(id,function  (err,brand) {
				_brands=_.extend(brand,brandsObj);
				_brands.save(function  (err) {
					if(err){
						console.log(err);
					}
					res.redirect('/admin/brands/list');					
				})
			})			
		}else{
			_brands = new Brands(brandsObj);
			_brands.save(function(err,brands){
				if(err){
					console.log(err);
				}
				res.redirect('/admin/brands');
			});
		}



};
exports.update = function(req,res){
		var id = req.params.id;
		// console.log(id);
		Brands.findById(id,function(err,brands){
			if(err){
				console.log(err);
			}
			res.render('admin/brands',{
				title:'品牌 修改',
				brands:brands
			});
		});		
	};

// exports.detail = function(req,res){
// 		var id = req.params.id;
// 		Car.findById(id,function(err,movie){
// 			if(err){
// 				console.log(err);
// 			}
// 			// console.log('1111     '+movie.title);
// 			// var movieTitle ='Car '+ movie.title || '';
// 			// Comments
			
// 			Comment_cl.find({movie:id})
// 				.populate('from','name')
// 				.populate('reply.from reply.to','name')
// 				.exec(function(err,comments){
					
// 					console.log(66666+JSON.stringify(comments));
// 					res.render('admin/detail',{
// 						title:'Car Detail',
// 						movie:movie,
// 						comments:comments
// 					});

// 				});



// 		});

// 	};

exports.del = function(req,res){
		var id = req.query.id;
		console.log('hahha '+id);
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













