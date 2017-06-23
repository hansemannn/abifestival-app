var api = require('/api');
var moment = require('alloy/moment');

(function constructor(args) {
	
})(arguments[0]);

function loadInfos() {
	api.getInfos(function(infos, error) {		
		var items = [];
		
		for (var i = 0; i < infos.length; i++) {
			var info = infos[i];
			items.push({
				template: Ti.UI.LIST_ITEM_TEMPLATE_SUBTITLE,
				properties: {
					itemId: info,
					title: info.title,
					subtitle: moment(info.created_at).format('DD.MM.YYYY, HH:mm') + ' Uhr',
					height: 43,
					accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
				}
			});
		}
		
		$.list.setSections([Ti.UI.createListSection({items: items})]);
		
		OS_IOS && $.refreshControl.endRefreshing();
	});
}

function openInfos(e) {
	Alloy.Globals.tabGroup.activeTab.openWindow(Alloy.createController('/infosDetails', { infos: e.itemId }).getView());
}
