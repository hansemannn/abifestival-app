var Request = require('/request');

exports.getNews = function(cb, error) {
	var request = new Request({
		url : '/news/list?festival=' + Alloy.CFG.festival.id,
		type : 'GET',
		success : function(json) {
			cb(_.extend(json, {success: true}), null);
		},
		error : function() {
			cb({success: false}, 'Error loading content');
		}
	});
	request.load();
};

exports.getInfos = function(cb, error) {
	var request = new Request({
		url : '/infopages/' + Alloy.CFG.festival.id + '/index.php',
		type : 'GET',
		success : function(json) {
			cb(_.extend(json, {success: true}), null);
		},
		error : function() {
			cb({success: false}, 'Error loading content');
		}
	});
	request.load();
};

exports.getBands = function(cb, error) {
	var request = new Request({
		url : '/band/list?festival=' + Alloy.CFG.festival.id,
		type : 'GET',
		success : function(json) {
			cb(_.extend(json, {success: true}), null);
		},
		error : function() {
			cb({success: false}, 'Error loading content');
		}
	});
	request.load();
};
