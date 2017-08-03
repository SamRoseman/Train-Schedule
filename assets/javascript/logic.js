  var config = {
    apiKey: "AIzaSyB8FRt-VhHiYsHkUeSMslCBhGK8bM8b8j8",
    authDomain: "trainschedule-ac9a8.firebaseapp.com",
    databaseURL: "https://trainschedule-ac9a8.firebaseio.com",
    projectId: "trainschedule-ac9a8",
    storageBucket: "trainschedule-ac9a8.appspot.com",
    messagingSenderId: "42048281649"
  };
  firebase.initializeApp(config);

// Assign the reference to the database to a variable named 'database'
//var database = ...
var database = firebase.database();


// --------------------------------------------------------------

$("#submit").on("click",function(event){
	event.preventDefault();

	// grabs user input
		var train = $("#train-name").val().trim();
		var destination = $("#destination").val().trim();
		var frequency = $("#frequency").val().trim();
	// grabs first train makes sure it is formatted correctly
		var startTime = $("#train-start").val().trim();
		var startFormat = "HH:mm";
		var convertedStartTime = moment(startTime, startFormat);
	

	// takes formatted first train and converts it to minutes
		var hours = moment(convertedStartTime).format("HH");
		var HinM = parseInt(hours * 60);
		var minutes = moment(convertedStartTime).format("mm");
		var allMin = HinM + parseInt(minutes);
	//  gets the current time stamp and converts to minutes
		var nowTime = moment().format("HH:mm");
		var nowFormat = "HH:mm";
		var convertedNowTime = moment(nowTime, nowFormat);
		var nowHours = moment(convertedNowTime).format("HH");
		var nowHinM = parseInt(nowHours * 60);
		var nowMinutes = moment(convertedNowTime).format("mm");
		var nowAllMin = nowHinM + parseInt(nowMinutes);
	//console times 
		console.log("First Train: " + startTime);
		console.log("First Train in Minutes: " + allMin);
		console.log("Current Time: " + nowTime);
		console.log("Current Time in Minutes: " + nowAllMin);


	//check to see if the first train time is greater than or equal to the current time
	if (allMin >= nowAllMin) {

		var backHours = Math.floor(allMin / 60);
		var backHoursMin = allMin % 60;
		var nextTrain = backHours + ":" + backHoursMin;
		var minutesUntil = allMin - nowAllMin;
	}

	else {
		while (nowAllMin > allMin) {
			allMin = allMin + parseInt(frequency);
		
		}
		var backHours = Math.floor(allMin / 60);
		var backHoursMin = allMin % 60;
		var nextTrain = backHours + ":" + backHoursMin;
		var minutesUntil = allMin - nowAllMin;
	
	}
		//creates temp object for new train info
		var trainObject = {
			train: train,
			destination: destination,
			frequency: frequency,
			minutesUntil: minutesUntil,
			nextTrain: nextTrain

			
		};

		database.ref().push(trainObject);
})

	// write the train information to the webpage
		database.ref().on("child_added", function(childSnapshot) {
			console.log(childSnapshot.val());

			var snapTrain = childSnapshot.val().train;
			var snapDest = childSnapshot.val().destination;
			var snapFreq = childSnapshot.val().frequency;
			var snapNext = childSnapshot.val().nextTrain;
			var snapMin = childSnapshot.val().minutesUntil;

			$("#train-table > tbody").append("<tr><td>" + snapTrain + "</td><td>" + snapDest + "</td><td>" + snapFreq + "</td><td>" + snapNext + "</td><td>" + snapMin +  "</td></tr>");
		});



