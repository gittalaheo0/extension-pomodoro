// app
var setTimePomodoro = null;
var setTimeRest = null;

// app counting function
//start pomodoro
function startCount(time){
	chrome.storage.local.get(["timePomodoro","timeRest"], function(store){
		let timePomo = parseFloat(store.timePomodoro)*60000; // get time to count
		// start count
		setTimePomodoro	= setTimeout(function(){
			// open rest tab/notification when done pomodoro
			chrome.storage.local.get(["openNewTabWhenEndPomo", "openNotifiWhenEndPomo"], function(store){
				openNotificationAndNewtab(true, store.openNewTabWhenEndPomo, store.openNotifiWhenEndPomo)
			})
		}, timePomo)
	})
}
//start rest
function startRest(time){
	chrome.storage.local.get(["timePomodoro","timeRest"], function(store){
		let timePomo = parseFloat(store.timePomodoro)*60000; // get time to count
		// start count
		setTimePomodoro	= setTimeout(function(){
			// do when done pomodoro
			console.log("done: " + timePomo);
		}, timePomo)
	})
}

// app open new tab and notification function
function openNotificationAndNewtab(donePomo, enableNewTab, enableNotifi){
	if(donePomo){  // if pomodoro done
		if(enableNewTab=="true"){
			//open new tab
			let optionsUrl = chrome.extension.getURL('option-page/tabopen/newtab.html');
			chrome.tabs.query({url: optionsUrl}, function(tabs) {
				console.log(tabs.length);
	    		if (tabs.length) {
	        		chrome.tabs.update(tabs[0].id, {active: true});
	    		} else {
	        		chrome.tabs.create({url: optionsUrl});
	 			}
			});
		}
		if(enableNotifi=="true"){
			let notifi = {
				title: 'Just wanted to notify you',
				message: 'How great it is!',
				iconUrl: 'option-page/icon.png',
				type: 'basic'
			}
			chrome.notifications.create('sdsdsd', notifi);
			
		};
	}else{  // if rest done
		
	}
}




chrome.runtime.onMessage.addListener(function(req, sender, res) {

	// start counting pomodoro
	if(req.do == "start counting"){
		startCount()
	}

	// start counting pomodoro
	// if(req.do == "start counting"){
	// 	startCount()
	// }
})