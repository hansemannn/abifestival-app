
(function constructor(args) {

})(arguments[0]);

function setupUserInterface() {
	OS_ANDROID && setupBackButton();
}

function setupBackButton() {
	var activity = $.window.getActivity();
	
	activity.actionBar.displayHomeAsUp = true;	
	activity.actionBar.onHomeIconItemSelected = function() { $.window.close() };
}
