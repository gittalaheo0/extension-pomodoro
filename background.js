// app
var setTimePomodoro = null;
var setTimeRest = null;

function startCount(time){
	chrome.storage.local.get(["timePomodoro","timeRest"], function(store){
		let timePomo = parseFloat(store.timePomodoro)*60000; // get time to count
		// start count
		setTimePomodoro	= setTimeout(function(){
			// do when done pomodoro
			console.log("done: " + timePomo);
		}, timePomo)
	})
}
// init


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