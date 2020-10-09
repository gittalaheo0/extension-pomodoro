// option variable
var openSetting = document.querySelector(".app_ctrl_setting");
var timeCounTing = document.querySelector(".app_countdown_pom")
var activeTimeCounTing = document.querySelector("#active")

// get information from store
chrome.storage.local.get(
	["timePomodoro","timeRest","openNewTabWhenEndPomo","openNotifiWhenEndPomo","openNewTabWhenEndRest","openNotifiWhenEndRest"],
	function(store){
		//handle the time
		if(store.timePomodoro && store.timeRest){
			timeCounTing.innerText = store.timePomodoro + "mins"
		}else{
			chrome.storage.local.set({"timePomodoro": 25})
			chrome.storage.local.set({"timeRest": 5})
		}

		//handle other function
		if(store.openNewTabWhenEndPomo && store.openNotifiWhenEndPomo && store.openNewTabWhenEndRest && store.openNotifiWhenEndRest){
			// code 			
		}else{
			chrome.storage.local.set({"openNewTabWhenEndPomo": "true"})
			chrome.storage.local.set({"openNotifiWhenEndPomo": "true"})
			chrome.storage.local.set({"openNewTabWhenEndRest": "true"})
			chrome.storage.local.set({"openNotifiWhenEndRest": "true"})
		}

})

// open setting page
openSetting.onclick = function() {
	let optionsUrl = chrome.extension.getURL('option-page/option.html');
	chrome.tabs.query({url: optionsUrl}, function(tabs) {
		console.log(tabs.length);
	    if (tabs.length) {
	        chrome.tabs.update(tabs[0].id, {active: true});
	    } else {
	        chrome.tabs.create({url: optionsUrl});
	    }
	});
}

// chrome.commands.onCommand.addListener(function(command) {
//     console.log('Command:', command);
// });
// start counting
activeTimeCounTing.onclick = function () {
	chrome.runtime.sendMessage({do: "start counting"});
}