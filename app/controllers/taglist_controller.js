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
	console.log( tag );
	Tags.findByName(tag,function  (err,tags) {
		console.log('[tags._id]',tags);
		if(tags){
			Car.getCarsByTag([tags._id+""],function(err,cars){
				if(err){
					console.log(err);
				}
				console.log( cars );
				debugger;

				res.render('tag',{
					title:'标签 列表',
					site:global.siteInfo,
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













