var Car = require('../models/car');
var Tags = require('../models/tags.js');
var _=require('underscore');


exports.list = function(req,res){
		Tags.fetch(function(err,tags){
			if(err){
				console.log(err);
			}
			res.render('tags_list',{
				title:'Cat 列表',
				tags:tags
			})


		});

	};

exports.new = function(req,res){
		

		res.render('tags',{
			title:'汽车品牌',
			tags:{
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
			res.render('tags',{
				title:'品牌 修改',
				tags:tags
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
// 					res.render('detail',{
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













