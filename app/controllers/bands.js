var api = require('/api');
var moment = require('alloy/moment');
var bands = [];

(function constructor(args) {
	
})(arguments[0]);

function loadBands(args) {
	var showLoader = args.showLoader || false;
	showLoader && $.loader.show();
	
	api.getBands(function(_bands, error) {
		bands = _bands;
		
		showLoader && $.loader.hide();
		refreshUI();
	});
}

function refreshUI() {
	var items = [];

	bands.forEach(function(band) {
		items.push({
			template: "BandCell",
			artist: {
				text: band.name.toUpperCase() + (isFavorite(band.id) ? ' ⭐️' : '')
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
			properties: _.extend({
				itemId: band.id,
				height: 50,
				accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
			}, OS_IOS ? {} : {color: '#000', left: 15}) // FIXME: Remove when 6.2.0 released
		});
	});
	
	$.list.setSections([Ti.UI.createListSection({items: items})]);	
	OS_IOS && $.refreshControl.endRefreshing();
}

function isFavorite(bandId) {
	return Ti.App.Properties.getList('favorites', []).indexOf(bandId) !== -1;
}

function formattedTime(start, end) {
	return '⏰ ' + moment(start).format('HH:mm') + ' - ' + moment(end).format('HH:mm') + ' Uhr';
}

function openBand(e) {
	Alloy.Globals.tabGroup.activeTab.open(Alloy.createController('/bandsDetails', { 
		band: _.findWhere(bands, { id: e.itemId }),
		onFavoriteUpdated: refreshUI
	}).getView());
}

function onPullToRefresh() {
	loadBands({ showLoader: false });

}

function onOpen(e) {
	loadBands({ showLoader: true });
}
