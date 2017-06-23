var moment = require('alloy/moment');
var band = {};

(function constructor(args) {
	band = args.band;	
})(arguments[0]);

function setupUserInterface() {
	$.window.setTitle(band.name);
}
