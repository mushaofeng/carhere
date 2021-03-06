// Models
var Car = require('../models/car');
var User = require('../models/user');
var _=require('underscore');
var multipart = require('connect-multiparty');
var multiMid = multipart();


//前台
var IndexController = require('../controllers/index_controller.js');
var SiteController = require('../controllers/site_controller.js');
var Taglist_controller = require('../controllers/taglist_controller.js');
//CMS
var RankController = require('../controllers/rank_controller.js');
var BannerController = require('../controllers/banner_controller.js');
var CategoryController = require('../controllers/category_controller.js');
var ImagesController = require('../controllers/images_controller.js');
//后端数据 
var BrandsController = require('../controllers/brands_controller.js');
var TagsController = require('../controllers/tags_controller.js');
var CarController = require('../controllers/car_controller.js');
var UserController = require('../controllers/user_controller.js');
var CommentController = require('../controllers/comment_controller.js');
var UploadController = require('../controllers/upload_controller.js');




module.exports = function(app){
	//#######
	// Middleware for Routes 
	//#######
	app.use(function(req,res,next){
		var _user = req.session.user;

		global.user=app.locals.user = _user;
		next();
	});

	//#######
	// routes 
	//#######
	//-- INDEX  网站页面
	app.get('/',IndexController.index);
	app.get('/tag',Taglist_controller.list);
	app.get('/about.html',function  (req,res) {
		res.render('about',{
			title:'关于我们',
			site:global.siteInfo,
			nav:'about'
		});
	});

	// API 接口
	app.get('/api/car',CarController.api.car);
	// CMS 页面
	app.get('/cms/site',UserController.signinRequired, UserController.adminRequired,SiteController.new);
	app.post('/cms/site/new',UserController.signinRequired, UserController.adminRequired,SiteController.saveNew)

	app.get('/cms/rank/list',UserController.signinRequired, UserController.adminRequired,RankController.list);
	app.get('/cms/rank',UserController.signinRequired, UserController.adminRequired,RankController.new);
	app.post('/cms/rank/new',UserController.signinRequired, UserController.adminRequired,RankController.saveNew)
	app.get('/cms/rank/update/:id',UserController.signinRequired, UserController.adminRequired,RankController.update);
	app.get('/cms/rank/delete?*',UserController.signinRequired, UserController.adminRequired,RankController.delete);



	app.get('/cms/banner/list',UserController.signinRequired, UserController.adminRequired,BannerController.list);
	app.get('/cms/banner',UserController.signinRequired, UserController.adminRequired,BannerController.new);
	app.post('/cms/banner/new',UserController.signinRequired, UserController.adminRequired,BannerController.saveNew)
	app.get('/cms/banner/update/:id',UserController.signinRequired, UserController.adminRequired,BannerController.update);
	// // Category
	app.get('/cms/category',CategoryController.new);
  	app.post('/cms/category/new',CategoryController.saveNew)
	app.get('/cms/category/list',CategoryController.list);	
	app.get('/cms/category/update/:id',CategoryController.update);	
	// // Category
	app.get('/cms/images',ImagesController.new);
  	app.post('/cms/images/new',ImagesController.saveNew)
	app.get('/cms/images/list',ImagesController.list);	
	app.get('/cms/images/update/:id',ImagesController.update);	
	app.get('/cms/images/delete?*',UserController.signinRequired, UserController.adminRequired,ImagesController.delete);
		
	//-- Admin  后台数据管理
	// app.get('/list',CarController.list);
	app.get('/car/:id',CarController.detail);
	app.get('/admin/car/list',UserController.signinRequired, UserController.adminRequired,CarController.list);
	app.get('/admin/car',UserController.signinRequired, UserController.adminRequired,CarController.new);
	app.post('/admin/car/new',UserController.signinRequired, UserController.adminRequired,CarController.saveNew)
	app.get('/admin/car/update/:id',UserController.signinRequired, UserController.adminRequired,CarController.update);
	app.get('/admin/car/delete?*',UserController.signinRequired, UserController.adminRequired,CarController.delete);

	// app.delete('/admin/car/list',UserController.signinRequired, UserController.adminRequired,CarController.del);

	// app.get('/api/car',CarController.api.car);	
	// 上传页面
	app.get('/admin/upload',UserController.signinRequired, UserController.adminRequired,UploadController.new);
	app.get('/admin/upload/list',UserController.signinRequired, UserController.adminRequired,UploadController.list);
	app.post('/admin/upload/new',UserController.signinRequired, UserController.adminRequired,UploadController.saveUpload);
	app.get('/admin/upload/delete?*',UserController.signinRequired, UserController.adminRequired,UploadController.delete);

	// //-- USER  
	app.post('/user/signup',UserController.signup);
	app.post('/user/signin',UserController.signin);
	app.get('/admin/userList', UserController.signinRequired, UserController.adminRequired, UserController.userList);
	app.get('/logout',UserController.logout);
	app.get('/signin',UserController.showSignin);
	app.get('/signup',UserController.showSignup);
	// // Comments
	// app.post('/admin/comment',UserController.signinRequired,CommentController.save);

	// // Category
	// app.get('/admin/category/new',CategoryController.new);
 //    app.post('/admin/category',CategoryController.saveNew)
	// app.get('/admin/category/list',CategoryController.list);
	// // pagination
	// app.get('/results',IndexController.search); 
	// BrandsController
	app.get('/admin/brands/list',UserController.signinRequired, UserController.adminRequired,BrandsController.list);
	app.get('/admin/brands',UserController.signinRequired, UserController.adminRequired,BrandsController.new);
	app.post('/admin/brands/new',UserController.signinRequired, UserController.adminRequired,BrandsController.saveNew)
	app.get('/admin/brands/update/:id',UserController.signinRequired, UserController.adminRequired,BrandsController.update);
	app.get('/admin/brands/delete?*',UserController.signinRequired, UserController.adminRequired,BrandsController.delete);
	
	// 标签 
	app.get('/admin/tags/list',UserController.signinRequired, UserController.adminRequired,TagsController.list);
	app.get('/admin/tags',UserController.signinRequired, UserController.adminRequired,TagsController.new);
	app.post('/admin/tags/new',UserController.signinRequired, UserController.adminRequired,TagsController.saveNew)
	app.get('/admin/tags/update/:id',UserController.signinRequired, UserController.adminRequired,TagsController.update);

};











