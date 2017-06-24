var api = require('/api');
var moment = require('alloy/moment');

(function constructor(args) {
	
})(arguments[0]);

function loadBands(args) {
	var showLoader = args.showLoader || false;
	
	showLoader && $.loader.show();
	
	api.getBands(function(bands, error) {		
		var items = [];
				
		for (var i = 0; i < bands.length; i++) {
			var band = bands[i];
			items.push({
				template: "BandCell",
				artist: {
					text: band.name.toUpperCase()
				},
				image: {
					image: band.image !== null ? band.image : '/branding/images/default.jpg'
				},
				stage: {
					text: '📍 ' + band.location
				},
				slot: {
					text: formattedTime(band.starttime, band.endtime)
				},
				properties: {
					itemId: band,
					height: 50,
					accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
				}
			});
		}
		
		$.list.setSections([Ti.UI.createListSection({items: items})]);
		
		OS_IOS && $.refreshControl.endRefreshing();
		showLoader && $.loader.hide();
	});
}

function formattedTime(start, end) {
	return '⏰ ' + moment(start).format('HH:mm') + ' - ' + moment(end).format('HH:mm') + ' Uhr';
}

function openBand(e) {
	Alloy.Globals.tabGroup.activeTab.openWindow(Alloy.createController('/bandsDetails', { band: e.itemId }).getView());
}

function onPullToRefresh() {
	loadBands({ showLoader: false });

}

function onOpen(e) {
	loadBands({ showLoader: true });
}
