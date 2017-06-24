var api = require('/api');
var moment = require('alloy/moment');
var Social = {
	Facebook: 'Facebook',
	Instagram: 'Instagram'
};
var news = [];

(function constructor(args) {
	
})(arguments[0]);

function onOpen() {
	loadNews({ showLoader: true });
}

function loadNews(args) {
	var showLoader = args.showLoader || false;
	showLoader && $.loader.show();
	
	api.getNews(function(_news, error) {		
		news = _news
		
		showLoader && $.loader.hide();
		refreshUI();
	});
}

function refreshUI() {
	var items = [];
	
	news.forEach(function(item) {
		items.push({
			template: Ti.UI.LIST_ITEM_TEMPLATE_SUBTITLE,
			properties: _.extend({
				itemId: item.id,
				title: item.title,
				subtitle: moment(item.created_at).format('DD.MM.YYYY, HH:mm') + ' Uhr',
				height: 43,
				accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
			}, OS_IOS ? {} : {color: '#000', left: 15}) // FIXME: Remove when 6.2.0 released
		});
	});
	
	$.list.setSections([Ti.UI.createListSection({items: items})]);	
	OS_IOS && $.refreshControl.endRefreshing();
}

function openNews(e) {
	Alloy.Globals.tabGroup.activeTab.open(Alloy.createController('/newsDetails', { news: _.findWhere(news, { id: e.itemId }) }).getView());
}

function openInstagram() {
	openSocialAccount(Alloy.CFG.festival.socials.instagram, Social.Instagram, 'instagram://user?username=', 'http://instagram.com');
}

function openFacebook() {
	openSocialAccount(Alloy.CFG.festival.socials.facebook.name, Social.Facebook, 'fb://profile/', 'https://facebook.com');
}

function openSocialAccount(username, socialNetwork, urlScheme, homepage) {
	var name = Alloy.CFG.festival.name;
	
	var dia = Ti.UI.createAlertDialog({
		title: name + ' auf ' + socialNetwork,
		message: 'Möchtest du jetzt zum ' + name + ' auf ' + socialNetwork + ' weitergeleitet werden?',
		buttonNames: ['Abbrechen', 'Öffnen'],
		cancel: 0
	});
		
	dia.addEventListener('click', function(e) {
		if (e.index === 1) {
			if (Ti.Platform.canOpenURL(urlScheme.split('://')[0] + '://')) {
				Ti.Platform.openURL(urlScheme + username);
			} else {
				Ti.Platform.openURL(homepage + '/' + username);
			}
		}
	});
	
	dia.show();
}

function onPullToRefresh() {
	loadNews({ showLoader: false });
}
