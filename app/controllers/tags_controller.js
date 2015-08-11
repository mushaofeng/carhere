var Car = require('../models/car');
var Tags = require('../models/tags.js');
var _=require('underscore');


exports.list = function(req,res){
		Tags.fetch(function(err,tags){
			if(err){
				console.log(err);
			}
			res.render('admin/tags_list',{
				title:'标签列表',
				site:global.siteInfo,
				tags:tags
			})


		});

	};

exports.new = function(req,res){
		

		res.render('admin/tags',{
			title:'标签',
			site:global.siteInfo,
			tags:{}
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
		var tagsObj = req.body.tags;
		var id = tagsObj._id;
		var _tags;
		if(id){
			Tags.findById(id,function  (err,tag) {
				_tags=_.extend(tag,tagsObj);
				_tags.save(function  () {
					if(err){
						console.log(err);
					}
					res.redirect('/admin/tags');					
				})
			})
		}else{
			_tags= new Tags(tagsObj);
			_tags.save(function(err,tags){
				if(err){
					console.log(err);
				}
				res.redirect('/admin/tags');
			});			
		}
};
exports.update = function(req,res){
		var id = req.params.id;
		// console.log(id);
		Tags.findById(id,function(err,tags){
			if(err){
				console.log(err);
			}
			res.render('admin/tags',{
				title:'标签 修改',
				site:global.siteInfo,
				tags:tags
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













