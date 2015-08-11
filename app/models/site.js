var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
// 网站信息表
var SiteSchema = new Schema({
	name:String,//公司名
	title:String,//网站title
	url:String,//公司网址
	keywords:String,//网站 keyword for seo
	description:String,//网站 描述 for seo
	tel:String,//联系电话
	address:String,//公司地址
	weixin:String,//公司微信 
	QQ:String,//QQ
	time:String,//营业时间 
	// pv:{
	// 	type:Number,
	// 	default:0
	// },
	// category:{
	// 	type:ObjectId,
	// 	ref:'Category'
	// },
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}

	}

});

// Middleware!
SiteSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else{
		this.meta.updateAt = Date.now();
	}
	
	// MUST !!! USE !!! next()!
	next();

});
// statics 
SiteSchema.statics = {
	fetch: function(cb){
		return this.find({}).exec(cb);
	},
	findById: function(id, cb){
		return this.findOne({_id: id}).exec(cb);
	}

};

module.exports = mongoose.model('Site',SiteSchema);

