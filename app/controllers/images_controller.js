var Images = require('../models/images.js');
exports.list = function(req,res){
	Images.fetch(function(err,list){
		if(err){
			console.log(err);
		}
		res.render('cms/images_list',{
			title:'图片集 列表',
			site:global.siteInfo,
			list:list
		})
	});
};
exports.update = function(req,res){
		var id = req.params.id;
		// console.log(id);
		Images.findById(id,function(err,images){
			if(err){
				console.log(err);
			}
			res.render('cms/images',{
				title:'图片集 修改',
				site:global.siteInfo,
				images:images
			});
		});		
	};
exports.delete = function  (req,res,next) {
	var name = req.query.name;
	Images.delete(name,function  (err,data) {
		res.send({err:0});
	})	
}	
exports.new = function(req,res){
	res.render('cms/images',{
		title:'图片集设置',
		site:global.siteInfo,
		images:{}
	});		
};
exports.saveNew = function(req,res){
	//console.log(req.body.movie);
	//bodyParser extended = true  -> is the key !!!
	var imagesObj = req.body.images;
	var id = imagesObj._id;
	var _data;
	if(id){
		Images.findById(id,function  (err,obj) {
			_data=_.extend(obj,imagesObj)
			_data.save(function  (err) {
				res.redirect('/cms/images/list');
			})
		})
	}else{
		_data = new Images(imagesObj);
		_data.save(function(err,imagesObj){
			if(err){
				console.log(err);
			}
			res.redirect('/cms/images');
		});
	}
};











