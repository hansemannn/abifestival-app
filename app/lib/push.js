var pushwoosh = require('com.pushwoosh.module');

pushwoosh.initialize({ 
    application: 'C2101-D1EBB',
    gcm_project: '705288584379'
});

pushwoosh.registerForPushNotifications(function(e) {
        Ti.API.info('JS registration success event: ' + e.registrationId);
        Ti.API.info('Push token ' + pushwoosh.getPushToken());
    }, function(e) {
        Ti.API.error('Error during registration: ' + e.error);
    }  
);
