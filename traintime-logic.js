
var config = {
    apiKey: "AIzaSyBMrYOSHGQxWDw0gQMSTmwZhVV_oBYBUCk",
    authDomain: "train-time-2295d.firebaseapp.com",
    databaseURL: "https://train-time-2295d.firebaseio.com",
    projectId: "train-time-2295d",
    storageBucket: "train-time-2295d.appspot.com",
    messagingSenderId: "446405574774"
};
firebase.initializeApp(config);

var trainData = firebase.database();

$("#add-train-btn").on("click", function () {
    var traiName = $("train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrainUnix = moment($("#first-train-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $("frequency-input").val().trim();

    var newTrain = {
        name: destination,
        firstTrain: firstTrainUnix,
        frequency: frequency
    };

    trainData.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(firstTrainUnix);
    console.log(newTrain.frequency);

    alert("Train successfully added");

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");

    return false;
});

trainData.ref().on("child_added", function (childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    var tName = childSnapshot.val().name;
    var tDestination = childSnapshot.val().destination;
    var tFrequency = childSnapshot.val().frequency;
    var tFirstTrain = childSnapshot.val().firstTrain;

    var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
    var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency;
    var tMinutes = tFrequency - tRemainder;

    var arrival = moment().add(tMinutes, "m").format("hh:mm A");

    $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>"
        + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
});

