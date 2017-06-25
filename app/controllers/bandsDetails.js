var moment = require('alloy/moment');
var pushwoosh = require('com.pushwoosh.module');
var FavoriteImage = {
	Active: '/images/favIconActive.png',
	Inactive: '/images/favIconInactive.png',
};

var band = {};
var onFavoriteUpdated = null;

(function constructor(args) {
	band = args.band;	
	onFavoriteUpdated = args.onFavoriteUpdated;
})(arguments[0]);

function setupUserInterface() {
	$.image.setImage(band.image !== null ? band.image : '/branding/images/default.jpg');
	$.artist.setText(band.name.toUpperCase());
	$.location.setText('📍 ' + band.location);
	$.time.setText(formattedTime(band.starttime, band.endtime));
	$.content.setValue(band.text);
	
	updateFavoritesImage();
}

function updateFavoritesImage() {
	if (OS_IOS) {
		$.fav.setImage(isFavorite() ? FavoriteImage.Active : FavoriteImage.Inactive);
	} else if (OS_ANDROID) {
		Ti.API.info('fav: ' + isFavorite());
		var activity = $.window.getActivity();
		activity.onCreateOptionsMenu = function(e) {
			var menu = e.menu;
			menu.clear();

			var item = menu.add({
				icon: isFavorite() === true ? FavoriteImage.Active : FavoriteImage.Inactive,
				showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS
			});
			item.addEventListener('click', toggleFavorite);
			Ti.API.info('inside');
		};
		activity.invalidateOptionsMenu();
	} else {
		Ti.API.error('Unimplemented for other platforms!');
	}
	
	onFavoriteUpdated();
}

function isFavorite() {
	var favorites = Ti.App.Properties.getList('favorites', []);
	return favorites.indexOf(band.id) !== -1;
}

function toggleFavorite() {
	var favorites = Ti.App.Properties.getList('favorites', []);
		
	if (favorites.indexOf(band.id) !== -1 ) {
		favorites.splice(favorites.indexOf(band.id), 1);
	} else {
		favorites.push(band.id);
	}
	
	// Update local persistence-layer
	Ti.App.Properties.setList('favorites', favorites);	
	
	// Update remote push-tags
	pushwoosh.setTags({ favorites: favorites });
	
	// Update UI
	updateFavoritesImage();
}

function formattedTime(start, end) {
	return '⏰ ' + moment(start).format('HH:mm') + ' - ' + moment(end).format('HH:mm') + ' Uhr';
}
