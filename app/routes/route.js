// Models
var Car = require('../models/car');
var User = require('../models/user');
var _=require('underscore');
var multipart = require('connect-multiparty');
var multiMid = multipart();


//后端数据 
var BrandsController = require('../controllers/brands_controller.js');
var TagsController = require('../controllers/tags_controller.js');
var CarController = require('../controllers/car_controller.js');

// Controllers
var IndexController = require('../controllers/index_controller.js');
var UserController = require('../controllers/user_controller.js');

var CommentController = require('../controllers/comment_controller.js');
var CategoryController = require('../controllers/category_controller.js');
var UploadController = require('../controllers/upload_controller.js');




module.exports = function(app){
	//#######
	// Middleware for Routes 
	//#######
	app.use(function(req,res,next){
		var _user = req.session.user;
		app.locals.user = _user;
		next();
	});

	//#######
	// routes 
	//#######
	//-- INDEX
	app.get('/',IndexController.index);

	//-- Car 
	// app.get('/list',CarController.list);
	app.get('/car/:id',CarController.detail);
	app.get('/admin/car/list',CarController.list);
	app.get('/admin/car',CarController.new);
	app.post('/admin/car/new',CarController.saveNew)
	app.get('/admin/car/update/:id',CarController.update);
	// app.delete('/admin/car/list',UserController.signinRequired, UserController.adminRequired,CarController.del);

	// app.get('/api/car',CarController.api.car);	
	// //upload
	app.get('/admin/upload',UploadController.new);
	app.get('/admin/upload/list',UploadController.list);
	app.post('/admin/upload/new',UploadController.saveUpload);
	// //-- USER
	// app.post('/user/signup',UserController.signup);
	// app.post('/user/signin',UserController.signin);
	// app.get('/admin/userList', UserController.signinRequired, UserController.adminRequired, UserController.userList);
	// app.get('/logout',UserController.logout);
	// app.get('/signin',UserController.showSignin);
	// app.get('/signup',UserController.showSignup);
	// // Comments
	// app.post('/admin/comment',UserController.signinRequired,CommentController.save);

	// // Category
	// app.get('/admin/category/new',CategoryController.new);
 //    app.post('/admin/category',CategoryController.saveNew)
	// app.get('/admin/category/list',CategoryController.list);
	// // pagination
	// app.get('/results',IndexController.search); 
	// BrandsController
	app.get('/admin/brands/list',BrandsController.list);
	app.get('/admin/brands',BrandsController.new);
	app.post('/admin/brands/new',BrandsController.saveNew)
	app.get('/admin/brands/update/:id',BrandsController.update);
	
	// 标签 
	app.get('/admin/tags/list',TagsController.list);
	app.get('/admin/tags',TagsController.new);
	app.post('/admin/tags/new',TagsController.saveNew)
	app.get('/admin/tags/update/:id',TagsController.update);

};











