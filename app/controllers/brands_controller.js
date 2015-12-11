var Car = require('../models/car');
var Brands = require('../models/brands.js');
var _=require('underscore');


exports.list = function(req,res){
	Brands.fetch(function(err,brands){
		if(err){
			console.log(err);
		}
		res.render('admin/brands_list',{
			title:'品牌 列表',
			site:global.siteInfo,
			brands:brands
		})


	});

};

exports.new = function(req,res){
		res.render('admin/brands',{
			title:'汽车品牌',
			site:global.siteInfo,
			brands:{}
		});
	};
exports.saveNew = function(req,res){
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
			site:global.siteInfo,
			brands:brands
		});
	});		
};


exports.delete = function(req,res,next){
	var name = req.query.name;
	Brands.delete(name,function  (err,data) {
		// res.json({success:1});
		res.send({err:0});
	})		
};













