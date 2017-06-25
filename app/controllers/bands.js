var api = require('/api'),
	moment = require('alloy/moment'),
	bands = [],
	days = Alloy.CFG.festival.days,
	currentDay = days[0];
	
(function constructor(args) {
	initTabbedBar();
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

function initTabbedBar() {
	var labels = [];
	
	days.forEach(function(day) {
		labels.push(day.name);
	});
	
	if (OS_IOS) {
		$.tabbedBar.setLabels(labels);
	} else {
		$.tabbedBar.init(labels, toggleDay);
	}
}

function toggleDay(e) {
	currentDay = days[e.index];
	refreshUI();
}

function refreshUI() {
	var items = [];

	OS_IOS && $.refreshControl.endRefreshing();
	$.section.setItems([]);	

	var filteredBands = _.filter(bands, function(band) {
		return band.starttime.indexOf(currentDay.date) !== -1 && band.active === true;
	});
	
	if (filteredBands.length === 0) {
		$.placeholder.show();
		return;
	} else {
		$.placeholder.hide();
	}
	
	filteredBands.forEach(function(band) {
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
				text: formattedTime(band.time_tba, band.starttime, band.endtime)
			},
			properties: _.extend({
				itemId: band.id,
				height: 50,
				accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
			}, OS_IOS ? {} : {color: '#000', left: 15}) // FIXME: Remove when 6.2.0 released
		});
	});
	
	$.section.setItems(items);	
}

function isFavorite(bandId) {
	return Ti.App.Properties.getList('favorites', []).indexOf(bandId) !== -1;
}

function formattedTime(tba, start, end) {
	return tba === true ? 'TBA' : '⏰ ' + moment(start).format('HH:mm') + ' - ' + moment(end).format('HH:mm') + ' Uhr';
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
