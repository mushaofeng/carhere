var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CarSchema = new Schema({
	name:String,//汽车名
	cover:String,//封面地址
	type:String,//汽车型号
	price:String,//汽车价格
	price_off:String,//折扣价
	price_4s:String,//4s价格
	sell_num:String,//售卖数量
	year:Number,//出厂年份
	reserve:Number,//库存
	summary:String,//概述

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
		return this.find({}).sort('meta.updateAt').exec(cb);
	},
	findById: function(id, cb){
		return this.findOne({_id: id}).exec(cb);

	}

};

module.exports = mongoose.model('Car',CarSchema);

