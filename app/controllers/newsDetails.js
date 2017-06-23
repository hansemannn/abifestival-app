var moment = require('alloy/moment');
var news = {};

(function constructor(args) {
	news = args.news;	
})(arguments[0]);

function setupUserInterface() {
	$.webView.setHtml('<style>* {font-family: "San Francisco", "Helvetica", "Roboto", "Arial", "sans-serif"; -webkit-touch-callout: none; -webkit-user-select: none;}</style>' + news.newstext);
}
