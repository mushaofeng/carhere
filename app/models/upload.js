var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var UploadSchema = new Schema({
	name:String,
	path:String,
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
		return this.find({}).sort({_id:-1}).exec(cb);

	},
	count:function  (cb) {
		// console.log( typeof this.count(true)+'&&&&&&' );
		// var o = this.count()
		// for (i in this.find().count()){

		// 	console.log(  i+'&&&&&&' );
		// }
		return this.find().count().exec(cb);
	},
	page: function  (start,size,cb) {
		var start=start||0,
				size=size||10;
				console.log( start +"***" +size);
		return this.find({}).sort({_id:-1}).skip(start).limit(size).exec(cb);
	},
	findById: function(id, cb){
		return this.findOne({_id: id}).exec(cb);

	}

};

module.exports = mongoose.model('Upload',UploadSchema);

