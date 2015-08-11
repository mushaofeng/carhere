var Site = require('../models/site.js');
var _=require('underscore');


exports.new = function(req,res){
	// Site.fetch(function  (err,site) {
	// 	// body...
	// 	console.log('global.siteInfo', global.siteInfo );
	// 	res.render('cms/site',{
	// 		title:'网站信息',
	// 		site:site[0]||{}
	// 	});		
	// })
		res.render('cms/site',{
			title:'网站信息',
			site:global.siteInfo
		});		

};
exports.saveNew = function(req,res){
		var siteObj = req.body.site;
		var id=siteObj._id;
		var _site;
		if(id){
			Site.findById(id,function  (err,brand) {
				_site=_.extend(brand,siteObj);
				_site.save(function  (err) {
					if(err){
						console.log(err);
					}
					res.redirect('/cms/site');					
				})
			})			
		}else{
			_site = new Site(siteObj);
			_site.save(function(err,site){
				if(err){
					console.log(err);
				}
				res.redirect('/cms/site');
			});
		}
};














