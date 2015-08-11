var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var BannerSchema = new Schema({
	link:String,//链接地址
	url:String,//banner图片地址
	order:Number,//排序
	status:Number,//状态 是否显示

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
BannerSchema.pre('save',function(next){
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
BannerSchema.statics = {
	fetch: function(cb){
		return this.find({}).sort({_id:-1}).exec(cb);
	},
	findById: function(id, cb){
		return this.findOne({_id: id}).exec(cb);

	}

};

module.exports = mongoose.model('Banner',BannerSchema);

