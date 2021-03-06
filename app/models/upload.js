var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId.createFromHexString;

var UploadSchema = new Schema({
	name:String,
	path:String,
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
UploadSchema.pre('save',function(next){
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
UploadSchema.statics = {
	fetch: function(cb){
		return this.find({status : { $ne : '1' }}).sort({_id:-1}).exec(cb);

	},
	count:function  (cb) {
		return this.find().count().exec(cb);
	},
	delete:function  (name,cb) {
		return this.update({name:name}, { status: 1 }).exec(cb);
	},
	page: function  (start,size,cb) {
		var s=start||0,
				n=size||10;
		return this.find({status : { $ne : '1' }}).sort({_id:-1}).skip(s).limit(n).exec(cb);
	},
	findById: function(id, cb){
		return this.findOne({_id: id}).exec(cb);
	}

};

module.exports = mongoose.model('Upload',UploadSchema);

