var config = {
    apiKey: "AIzaSyB5Mm3ALpd5pjxdWZeL8QI0Tr_BQ0z0N6o",
    authDomain: "train-station-a341f.firebaseapp.com",
    databaseURL: "https://train-station-a341f.firebaseio.com",
    projectId: "train-station-a341f",
    storageBucket: "train-station-a341f.appspot.com",
    messagingSenderId: "879237430361"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#train-destination").val().trim();
    var firstTrainTime = moment($("#first-train-time").val().trim(), "h:mm:ss a").format("LT");
    var trainFrequency = $("#frequency-minutes").val().trim();


    var newTrain = {
        name: trainName,
        destination: trainDestination,
        firstTrain: firstTrainTime,
        frequency: trainFrequency,
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrainTime);
    console.log(newTrain.frequency);



    alert("There's a new train on the tracks!");

    $("#train-name-input").val("");
    $("#train-destination").val("");
    $("#first-train-time").val("");
    $("#frequency-minutes").val("");

});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTrain;
    var trainFrequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrainTime);
    console.log(trainFrequency);

    var firstTimeConverted = moment(firstTrainTime, "hh:mm a").subtract(1, "years");

    var currentTime = moment();

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    var tRemainder = diffTime % trainFrequency;

    var tMinutesTillTrain = trainFrequency - tRemainder;

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");


    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(firstTrainTime),
        $("<td>").text(trainFrequency),
        $("<td>").text(tMinutesTillTrain),
    );

    $("#train-table > tbody").append(newRow);
});