var localRoot = __dirname;

exports.serverRoot = localRoot + '';
exports.map = [

	['http://182.92.183.34:3000/assets/js', localRoot + '/public/assets/js'],
	['http://182.92.183.34:3000/build', localRoot + '/public/assets/css'],


];

exports.before = function(url) {
	var Tudou = this.util.loadPlugin('tudou');

	url = Tudou.stripVersionInfo(url);
	url = Tudou.cssToLess(url);

	return url;
};

exports.merge = function(path, callback) {
	var Tudou = this.util.loadPlugin('tudou');

	Tudou.merge.call(this, path, callback);
}; 