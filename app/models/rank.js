var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var RankSchema = new Schema({
	name:String,//名称
	num:Number,//销售数量
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
RankSchema.pre('save',function(next){
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
RankSchema.statics = {
	fetch: function(cb){
		return this.find({status:{$ne:'1'}}).sort({num:-1}).exec(cb);
	},
	delete:function  (name,cb) {
		return this.update({name:name}, { status: 1 }).exec(cb);
	}
};

module.exports = mongoose.model('Rank',RankSchema);

