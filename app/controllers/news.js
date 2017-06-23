var api = require('/api');
var moment = require('alloy/moment');

(function constructor(args) {
	
})(arguments[0]);

function loadNews() {
	api.getNews(function(news, error) {
		Ti.API.info(news);
		
		var items = [];
		
		for (var i = 0; i < news.length; i++) {
			var item = news[i];
			items.push({
				template: Ti.UI.LIST_ITEM_TEMPLATE_SUBTITLE,
				properties: {
					itemId: item,
					title: item.title,
					subtitle: moment(item.created_at).format('DD.MM.YYYY, HH:mm') + ' Uhr',
					height: 43,
					accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
				}
			});
		}
		
		$.list.setSections([Ti.UI.createListSection({items: items})]);
		
		OS_IOS && $.refreshControl.endRefreshing();
	});
}

function openNews(e) {
	var news = e.itemId;		
	Alloy.Globals.tabGroup.activeTab.openWindow(Alloy.createController('/newsDetails', { news: news }).getView());
}
