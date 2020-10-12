// app
var setTimePomodoro = null;
var setTimeRest = null;
var currenSecondCouting = null;

// app counting function
//start pomodoro
function startCount(){
	chrome.storage.local.get(["timePomodoro"], function(store){
		let timePomo = parseFloat(store.timePomodoro)*60000; // get time to count
		// start count
		setTimePomodoro	= setTimeout(function(){
			// open rest tab/notification when done pomodoro
			chrome.storage.local.get(["openNewTabWhenEndPomo", "openNotifiWhenEndPomo"], function(store){
				openNotificationAndNewtab(true, store.openNewTabWhenEndPomo, store.openNotifiWhenEndPomo)
			})

			// clear interval update curren count
			clearInterval(currenSecondCouting)
			console.log("done");
		}, timePomo)

		// start update counter in storage
		updateCurrenTimeCouting(timePomo)
	})
}
//start rest
function startRest(){
	chrome.storage.local.get(["timeRest"], function(store){
		let timeRest = parseFloat(store.timeRest)*60000; // get time to count
		// start count
		setTimePomodoro	= setTimeout(function(){
			// open pomodoro tab/notification when done rest
			chrome.storage.local.get(["openNewTabWhenEndRest", "openNotifiWhenEndRest"], function(store){
				openNotificationAndNewtab(false, store.openNewTabWhenEndRest, store.openNotifiWhenEndRest)
			})
			
			// clear interval update curren count
			clearInterval(currenSecondCouting)
			console.log("done");
		}, timeRest)

		// start update counter in storage
		updateCurrenTimeCouting(timeRest)
	})
}

//update curren time to storage
function updateCurrenTimeCouting(totalSecond){
	let count = 0;
	currenSecondCouting	= setInterval(function(){
		// update to storage
		count+=1000;
		if(count>=totalSecond){
			clearInterval(currenSecondCouting)
		}else{
			console.log(count);
			chrome.storage.local.set({"currenSecondCouting": count})			
		}
	}, 1000)
}

// app open new tab and notification function
function openNotificationAndNewtab(donePomo, enableNewTab, enableNotifi){
	if(donePomo){  // if pomodoro done
		if(enableNewTab=="true"){
			//open new tab
			let optionsUrl = chrome.extension.getURL('newtab.html');
			chrome.tabs.query({url: optionsUrl}, function(tabs) {
				if(!tabs.length){
	        		chrome.tabs.create({url: optionsUrl});
				}
			});
		}
		if(enableNotifi=="true"){
			let notifi = {
				title: 'Done',
				message: 'You have done a pomodoro!!!',
				iconUrl: 'tomato.png',
				type: 'basic',
				buttons: [
					{
					  "title": "Start Rest"
					}
				]
			}
			chrome.notifications.create('sdsdsd', notifi);
			// handle event when click the button
			chrome.notifications.onButtonClicked.addListener((id, index) => {
				chrome.notifications.clear(id);
				// start rest
				startRest()
			});
		};
	}else{  // if rest done
		if(enableNewTab=="true"){
			//open new tab
			let optionsUrl = chrome.extension.getURL('newtab.html');
			chrome.tabs.query({url: optionsUrl}, function(tabs) {
				if(!tabs.length){
	        		chrome.tabs.create({url: optionsUrl});
				}
			});
		}
		if(enableNotifi=="true"){
			let notifi = {
				title: 'Done',
				message: 'It is time to start a pomodoro !!!',
				iconUrl: 'tomato.png',
				type: 'basic',
				buttons: [
					{
					  "title": "Start a pomodoro"
					}
				]
			}
			chrome.notifications.create('sdsdsd', notifi);
			// handle event when click the button
			chrome.notifications.onButtonClicked.addListener((id, index) => {
				chrome.notifications.clear(id);
				// start count
				startCount()
			});
		}
	}	
}

chrome.runtime.onMessage.addListener(function(req, sender, res) {
	// start counting pomodoro
	if(req.do == "start counting"){
		startCount()
	}
})