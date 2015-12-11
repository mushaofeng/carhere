var Rank = require('../models/rank.js');
var _=require('underscore');


exports.list = function(req,res){
	Rank.fetch(function(err,rank){
		if(err){
			console.log(err);
		}
		res.render('cms/rank_list',{
			title:'排行榜 列表',
			site:global.siteInfo,
			rank:rank
		})
	});
};

exports.new = function(req,res){
	res.render('cms/rank',{
		title:'销售排行榜',
		site:global.siteInfo,
		rank:{
		}
	});
};
exports.saveNew = function(req,res){
	var rankObj = req.body.rank;
	var id=rankObj._id;
	var _rank
	if(id){
		Rank.findById(id,function  (err,brand) {
			_rank=_.extend(brand,rankObj);
			_rank.save(function  () {
				if(err){
					console.log(err);
				}
				res.redirect('/cms/rank/list');					
			})
		})			
	}else{
		_rank = new Rank(rankObj);
		_rank.save(function(err,rank){
			if(err){
				console.log(err);
			}
			res.redirect('/cms/rank');
		});
	}
};
exports.update = function(req,res){
	var id = req.params.id;
	Rank.findById(id,function(err,rank){
		if(err){
			console.log(err);
		}
		res.render('cms/rank',{
			title:'销售排行榜 修改',
			site:global.siteInfo,
			rank:rank
		});
	});		
};
exports.delete = function  (req,res,next) {
	var name = req.query.name;
	Rank.delete(name,function  (err,data) {
		res.send({err:0});
	})	
}








