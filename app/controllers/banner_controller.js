var Car = require('../models/car');
var Banner = require('../models/banner.js');
var _=require('underscore');


exports.list = function(req,res){
		Banner.fetch(function(err,banner){
			if(err){
				console.log(err);
			}
			res.render('cms/banner_list',{
				title:'焦点图 列表',
				banner:banner
			})


		});

	};

exports.new = function(req,res){
		

		res.render('cms/banner',{
			title:'焦点图',
			banner:{
			}
		});

	};
exports.saveNew = function(req,res){
		var bannerObj = req.body.banner;
		var id=bannerObj._id;
		var _banner
	console.log( bannerObj );
		if(id){
			Banner.findById(id,function  (err,brand) {
				_banner=_.extend(brand,bannerObj);
				_banner.save(function  () {
					if(err){
						console.log(err);
					}
					res.redirect('/cms/banner/list');					
				})
			})			
		}else{
			_banner = new Banner(bannerObj);
			console.log( bannerObj );
			_banner.save(function(err,banner){
				if(err){
					console.log(err);
				}
				res.redirect('/cms/banner');
			});
		}



};
exports.update = function(req,res){
		var id = req.params.id;
		// console.log(id);
		Banner.findById(id,function(err,banner){
			if(err){
				console.log(err);
			}
			res.render('cms/banner',{
				title:'焦点图 修改',
				banner:banner
			});
		});		
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













