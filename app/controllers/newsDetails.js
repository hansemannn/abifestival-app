var moment = require('alloy/moment');
var news = {};

(function constructor(args) {
	news = args.news;	
})(arguments[0]);

function setupUserInterface() {
	var html = '';
	
	html += '<!DOCTYPE html><html><head>';
	html += '<meta name="viewport" content="width=device-width, user-scalable=no,initial-scale=1.0,maximum-scale=1.0"/>';
	html += '<style>body { font-family: "San Francisco", "Helvetica", "Roboto", "Arial", "sans-serif"; -webkit-touch-callout: none; -webkit-user-select: none; padding: 10px; }</style>';
	html += '</head><body>';
	html += news.newstext;
	html += '</body></html>';
		
	$.webView.setHtml(html);
	
	OS_ANDROID && setupBackButton();
}

function setupBackButton() {
	var activity = $.window.getActivity();
	
	activity.actionBar.displayHomeAsUp = true;	
	activity.actionBar.onHomeIconItemSelected = function() { $.window.close() };
}
