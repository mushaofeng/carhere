var Upload = require('../models/upload');
var _=require('underscore');
var fs = require('fs');
var path = require('path');

// savePoster Midware
exports.saveUpload = function(req,res,next){
	var posterData = req.files.uploadPoster;
	var filePath = posterData.path;
	var originalFilename = posterData.originalFilename;
	var _upload;
	var domain='http://'+req.headers.host;
	if(originalFilename){
		fs.readFile(filePath,function(err,data){
			var timestamp = Date.now();
			var type = posterData.type.split('/')[1];
			var poster = timestamp+'.'+type;
			var newPath = path.join(__dirname,'../../','/public/upload/'+poster);

			fs.writeFile(newPath,data,function(err){
				req.poster = poster;
				_upload= new Upload({
					path:domain + '/upload/'+poster,
					name:poster
				})
				_upload.save(function  (err,upload) {
					console.log(upload  );
					res.redirect('/admin/upload');
				})
			});

		});
	}

};
exports.new = function  (req,res,next) {
	res.render('admin/upload',{
		title:'图片上传',
		site:global.siteInfo
	});	
}
exports.list=function  (req,res,next) {
	var start = req.query.start||1,
			size = req.query.size||10;
	Upload.page(start,size,function  (err,uploads) {
		if(err){
			console.log( err );
		}
		Upload.count(function  (err,cnt) {
			//to 传递URL
			// delete req.query.start;
			// delete req.query.size;
			var _page=_.extend(req.query,{
					total:cnt,
					start:start,
					size:size,
					cur:Math.floor(start/size),
					num:Math.ceil(cnt/size)
				})
			res.render('admin/uploadlist',{
				title:'上传图片列表',
				site:global.siteInfo,
				uploads:uploads,
				page:_page
			})			
		});		

	})
}