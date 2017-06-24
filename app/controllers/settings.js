
(function constructor(args) {

})(arguments[0]);

function performAction(e) {	
	switch (e.itemId) {
		case 'rateApp':
			rateApp();
			break;
		case 'imprint':
			showImprint();
			break;
		case 'reportError':
			reportError();
			break
		default:
			Ti.API.error('Unknown action selected: ' + e.sectionIndex + '/' + e.itemIndex);
	}
}

function rateApp() {
	if (Ti.Platform.osname === 'android') {
		Ti.Platform.openURL('https://play.google.com/store/apps/details?id=' + Alloy.CFG.festival.stores.googlePlay);
	} else {
		Ti.Platform.openURL('https://itunes.apple.com/de/app/abifestival/id' + Alloy.CFG.festival.stores.appstore);
	}
}

function showImprint() {
	Alloy.Globals.tabGroup.activeTab.open(Alloy.createController('imprint').getView());
}

function reportError() {
	Ti.UI.createEmailDialog({
		subject: Alloy.CFG.festival.name + ': Fehler melden',
		toRecipients : [Alloy.CFG.festival.contactEmail]
	}).open();
}
