var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var ImagesSchema = new Schema({
	name:String,//图片集名
	code:String,//图片集code 
	desc:String,//图片集描述
	src:Array,//图片地址
	operator:String,	
	status:{
		type:String,
		default:0
	},//状态 是否	
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
ImagesSchema.pre('save',function(next){
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
ImagesSchema.statics = {
	fetch: function(cb){
		return this.find({status:{$ne:'1'}}).sort('meta.updateAt').exec(cb);
	},
	getCategoryCars:function  (code,cb) {
		return this.findOne({code: code}).populate('uploads').exec(cb)
	},
	delete:function  (name,cb) {
		return this.update({name:name}, { status: 1 }).exec(cb);
	},	
	findById: function(id, cb){
		return this.findOne({_id: id}).exec(cb);

	}

};

module.exports = mongoose.model('Images',ImagesSchema);

