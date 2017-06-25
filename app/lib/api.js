var Request = require('/request');
var isDemo = require('auth').isDemo();

function loadLocalJSON(identifier) {
	return JSON.parse(Ti.Filesystem.getFile(Ti.Filesystem.getResourcesDirectory(), 'json/' + identifier + '.json').read());
}

exports.getNews = function(cb, error) {
	if (isDemo === true) {
		setTimeout(function() {
			cb(loadLocalJSON('news'));
		}, 1000);
		
		return;
	}
	
	var request = new Request({
		url : '/news/list?festival=' + Alloy.CFG.festival.id + '&sortby=playtime',
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
	if (isDemo === true) {
		setTimeout(function() {
			cb(loadLocalJSON('infos'));
		}, 1000);
		
		return;
	}
	
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
	if (isDemo === true) {
		setTimeout(function() {
			cb(loadLocalJSON('bands'));
		}, 1000);
		
		return;
	}
	
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
