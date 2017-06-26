var moment = require('alloy/moment');
var infos = {};

(function constructor(args) {
	infos = args.infos;	
})(arguments[0]);

function setupUserInterface() {
	$.window.setTitle(infos.title);
	$.webView.setUrl(Alloy.CFG.festival.web.base + '/' + infos.url + '.html');
	
	OS_ANDROID && setupBackButton();
}

function setupBackButton() {
	var activity = $.window.getActivity();
	
	activity.actionBar.displayHomeAsUp = true;	
	activity.actionBar.onHomeIconItemSelected = function() { $.window.close() };
}
