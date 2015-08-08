var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var BrandsSchema = new Schema({
	name:String,//品牌名
	code:String,//编码
	logoUrl:String,//logo 图片地址
	order:Number,//排序
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
BrandsSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else{
		this.meta.updateAt = Date.now();
	}
	
	// MUST !!! USE !!! next()!
	next();

});
// statics 
BrandsSchema.statics = {
	fetch: function(cb){
		return this.find({}).sort('meta.updateAt').exec(cb);
	},
	findById: function(id, cb){
		return this.findOne({_id: id}).exec(cb);

	}

};

module.exports = mongoose.model('Brands',BrandsSchema);

