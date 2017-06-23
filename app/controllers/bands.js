var api = require('/api');
var moment = require('alloy/moment');

(function constructor(args) {
	
})(arguments[0]);

function loadBands() {
	api.getBands(function(bands, error) {		
		var items = [];
		
		Ti.API.warn(bands);
		
		for (var i = 0; i < bands.length; i++) {
			var band = bands[i];
			items.push({
				template: "BandCell",
				artist: {
					text: band.name.toUpperCase()
				},
				image: {
					image: band.image
				},
				stage: {
					text: band.location
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
	});
}

function formattedTime(start, end) {
	return moment(start).format('HH:mm') + ' - ' + moment(end).format('HH:mm') + ' Uhr';
}

function openBand(e) {
	Alloy.Globals.tabGroup.activeTab.openWindow(Alloy.createController('/bandsDetails', { band: e.itemId }).getView());
}
