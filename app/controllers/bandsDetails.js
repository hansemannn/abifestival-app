var moment = require('alloy/moment');
var FavoriteImage = {
	Active: '/images/favIconActive.png',
	Inactive: '/images/favIconInactive.png',
};

var band = {};

(function constructor(args) {
	band = args.band;	
})(arguments[0]);

function setupUserInterface() {
	$.image.setImage(band.image);
	$.artist.setText(band.name.toUpperCase());
	$.location.setText('📍 ' + band.location);
	$.time.setText('⏰ ' + formattedTime(band.starttime, band.endtime));
	$.content.setValue(band.text);
	
	updateFavoritesImage();
}

function updateFavoritesImage() {
	
	if (OS_IOS) {
		$.fav.setImage(isFavorite() ? FavoriteImage.Active : FavoriteImage.Inactive);
	} else if(OS_ANDROID) {
		$.fav.setIcon(isFavorite() ? FavoriteImage.Active : FavoriteImage.Inactive);
	} else {
		Ti.API.error('Unimplemented for other platforms!');
	}
}

function isFavorite() {
	var favorites = Ti.App.Properties.getList('favorites');
	return favorites ? favorites.indexOf(band.id) !== -1 : false;
}

function toggleFavorite() {
	var favorites = Ti.App.Properties.getList('favorites');
	
	if (favorites == null) {
		favorites = [];
	}
	
	if (favorites.indexOf(band.id) !== -1 ) {
		favorites.splice(favorites.indexOf(band.id), 1);
	} else {
		favorites.push(band.id);
	}
	
	Ti.App.Properties.setList('favorites', favorites);	
	updateFavoritesImage();
}

function formattedTime(start, end) {
	return moment(start).format('HH:mm') + ' - ' + moment(end).format('HH:mm') + ' Uhr';
}
