var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CarSchema = new Schema({
	name:String,//汽车名
	cover:String,//封面地址
	cover_l:Array,//封面大图
	tag:Array,//汽车标签
	type:String,//汽车编号
	version:String,//汽车规格
	color:String,//颜色
	price:String,//汽车价格
	price_off:String,//折扣价
	price_4s:String,//4s价格
	sell_num:String,//售卖数量
	year:Number,//出厂年份
	reserve:Number,//库存
	summary:String,//概述
	status:{
		type:String,
		default:0
	},//状态 是否
	operator:String,
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
CarSchema.pre('save',function(next){
	this.operator=global.user.name;
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else{
		this.meta.updateAt = Date.now();
	}
	
	// MUST !!! USE !!! next()!
	next();

});
// statics 
CarSchema.statics = {
	fetch: function(cb){
		return this.find({status:{$ne:'1'}}).sort('meta.updateAt').exec(cb);
	},
	getCarsById:function  (arr,cb) {
		return this.find({_id:{$in:arr}}).exec(cb);
	},	
	getCarsByTag:function  (arr,cb) {
		return this.find({'tag':{$in:arr},status : { $ne : '1' }}).exec(cb);
	},	
	delete:function  (name,cb) {
		return this.update({name:name}, { status: 1 }).exec(cb);
	},		
	page: function  (start,size,cb) {
		var s=start||0,
				n=size||10;
		return this.find({status : { $ne : '1' }}).sort({_id:-1}).skip(s).limit(n).exec(cb);
	},
	top: function(cb){
		return this.find({status : { $ne : '1' }}).sort('meta.updateAt').limit(5).exec(cb);
	},	
	search:function  (s,cb) {
		return this.find({'name':eval('/'+s+'/'),status : { $ne : 0 }}).exec(cb);
	},
	findById: function(id, cb){
		return this.findOne({_id: id}).exec(cb);
	}

};

module.exports = mongoose.model('Car',CarSchema);

