var _=require('underscore');
var fs = require('fs');
var path = require('path');
// var async = require('async');
var Car = require('../models/car');
// var Comment_cl = require('../models/comment.js');
var Tags = require('../models/tags.js');

// savePoster Midware
exports.list = function(req,res){
	var tag = req.query.tag;
	Tags.findByName(tag,function  (err,tags) {
		if(tags){
			Car.getCarsByTag([tags._id+""],function(err,cars){
				if(err){
					console.log(err);
				}
				res.render('tag',{
					title:'标签 列表',
					site:global.siteInfo,
					tag:tag,
					cars:cars
				})
			});

		}else{
			res.render('tag',{
				title:'标签 列表',
				site:global.siteInfo,
				cars:[]
			})
		}

	})
};













