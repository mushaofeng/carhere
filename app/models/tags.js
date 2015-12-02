var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var TagsSchema = new Schema({
	name:String,//标签名
	// code:String,//编码
	order:Number,//排序
	show:Number,
	operator:String,	
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
TagsSchema.pre('save',function(next){
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
TagsSchema.statics = {
	fetch: function(cb){
		return this.find({}).sort('meta.updateAt').exec(cb);
	},
	getTag:function  (arr,cb) {
		// body...
		return this.find({_id:{$in:arr}}).exec(cb);
	},
	findByName: function(name, cb){
		return this.findOne({'name': name}).exec(cb);
	},	
	findById: function(id, cb){
		return this.findOne({_id: id}).exec(cb);

	}

};

module.exports = mongoose.model('Tags',TagsSchema);

