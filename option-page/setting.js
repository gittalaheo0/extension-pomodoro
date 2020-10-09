// DOM variable
var pomodoroTimeSetting = document.querySelector("#pomodoro_time");
var restTimeSetting = document.querySelector("#rest_time");
var openNewTabWhenEndPomo = document.querySelector("#openNewTabWhenEndPomo")
var openNotifiWhenEndPomo = document.querySelector("#openNotifiWhenEndPomo")
var openNewTabWhenEndRest = document.querySelector("#openNewTabWhenEndRest")
var openNotifiWhenEndRest = document.querySelector("#openNotifiWhenEndRest")
var saveBtn = document.querySelector(".save")


// update information for page
chrome.storage.local.get(
	["timePomodoro","timeRest","openNewTabWhenEndPomo","openNotifiWhenEndPomo","openNewTabWhenEndRest","openNotifiWhenEndRest"],
	 function(store){
		// handle the time
		if(store.timePomodoro && store.timeRest){
			pomodoroTimeSetting.value = parseInt(store.timePomodoro)
			restTimeSetting.value = parseInt(store.timeRest)
		}else{ // if this is the fist time use app, set default time is 25 and 5
			// update storage
			chrome.storage.local.set({"timePomodoro": 25})
			chrome.storage.local.set({"timeRest": 5})
			// update page
			pomodoroTimeSetting.value = 25
			restTimeSetting.value = 5
		}
		// handle other function
		if(store.openNewTabWhenEndPomo && store.openNotifiWhenEndPomo && store.openNewTabWhenEndRest && store.openNotifiWhenEndRest){
			openNewTabWhenEndPomo.checked = store.openNewTabWhenEndPomo == "true" ? true : false
			openNotifiWhenEndPomo.checked = store.openNotifiWhenEndPomo == "true" ? true : false
			openNewTabWhenEndRest.checked = store.openNewTabWhenEndRest == "true" ? true : false
			openNotifiWhenEndRest.checked = store.openNotifiWhenEndRest == "true" ? true : false
		}else{
			chrome.storage.local.set({"openNewTabWhenEndPomo": "true"})
			chrome.storage.local.set({"openNotifiWhenEndPomo": "true"})
			chrome.storage.local.set({"openNewTabWhenEndRest": "true"})
			chrome.storage.local.set({"openNotifiWhenEndRest": "true"})
		}
})


// save information
saveBtn.onclick = function () {
 	chrome.storage.local.set({"timePomodoro": pomodoroTimeSetting.value})
 	chrome.storage.local.set({"timeRest": restTimeSetting.value})
 	chrome.storage.local.set({"openNewTabWhenEndPomo" : openNewTabWhenEndPomo.checked == true ? "true" : "false"})
 	chrome.storage.local.set({"openNotifiWhenEndPomo" : openNotifiWhenEndPomo.checked == true ? "true" : "false"})
 	chrome.storage.local.set({"openNewTabWhenEndRest" : openNewTabWhenEndRest.checked == true ? "true" : "false"})
 	chrome.storage.local.set({"openNotifiWhenEndRest" : openNotifiWhenEndRest.checked == true ? "true" : "false"})
 	chrome.tabs.getCurrent(function(tab){
 		chrome.tabs.remove(tab.id)
 	})
}