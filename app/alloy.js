
/** Register for Push Notifications **/

var pushwoosh = require('com.pushwoosh.module');

pushwoosh.onPushReceived(function(e) {
	Ti.API.info('Push notification received: ' + JSON.stringify(e));
});

pushwoosh.onPushOpened(function(e) {
	Ti.API.info('Push notification opened: ' + JSON.stringify(e));
});

try {
	var pushCredentials = require('/auth').pushCredentials;
	pushwoosh.initialize({ 
	    application: pushCredentials.application,
	    gcm_project: pushCredentials.gcm_project
	});
} catch(e) {
	Ti.API.warn('Cannot initialize push-notifications in demo-mode.');
	Ti.API.warn('Create a \'auth.js\' in app/lib/ and export a \'pushCredentials\' property that includes the auth-object.');
}

if (require('/helper').isSimulator() === false) {
	pushwoosh.registerForPushNotifications(function(e) {
	        Ti.API.info('JS registration success event: ' + e.registrationId);
	        Ti.API.info('Push token ' + pushwoosh.getPushToken());
	    }, function(e) {
	        Ti.API.error('Error during registration: ' + e.error);
	    }  
	);
}

/** Handle 3D-Touch Shortcut-Items **/

if (OS_IOS) {
	Ti.App.iOS.addEventListener('shortcutitemclick', function(e) {	
		switch(e.itemtype) {
			case 'bands': {
				Alloy.Globals.tabGroup.setActiveTab(2);
			}
			break;
		}
	});
}

/** Store reference to our tab-group **/

Alloy.Globals.tabGroup = {};

/** Store reference to our title-bar-image **/

Alloy.Globals.titleImage = Ti.UI.createImageView({
	image: '/branding/images/header.png',
	width: 182,
	height: 31
});

/** Handle URL-clicks from our web-view **/

// FIXME: Remove global scope, has to be global right now to handle
// click from Ti.UI.WebView link addresses
Ti.App.addEventListener('sendMail', function(e) {
	Ti.Platform.openURL(e.url);
});
