var config = {
    apiKey: "AIzaSyARGCCDtZ9B7ZtA1Of4jpKqO-AstoFHLcE",
    authDomain: "trainscheduler-719de.firebaseapp.com",
    databaseURL: "https://trainscheduler-719de.firebaseio.com",
    storageBucket: "trainscheduler-719de.appspot.com",
    messagingSenderId: "225722848925"
};

firebase.initializeApp(config);

var DB = firebase.database();

function displayTime() {
    $("#clock").html(moment().format("H:mm:ss"));
}
setInterval(displayTime, 1000);

$("#addButton").on("click", function(event) {

    event.preventDefault();

    var name = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var start = moment($("#start-input").val().trim(), "HH:mm").format("MMM DD, YYYY hh:mm A");
    var frequency = $("#frequency-input").val().trim();

    var train = {
        name: name,
        destination: destination,
        start: start,
        frequency: frequency
    };

    DB.ref().push(train);

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");

});

DB.ref().on("child_added", function(Snapshot) {
    var name = Snapshot.val().name;
    var destination = Snapshot.val().destination;
    var start = Snapshot.val().start;
    var convertedStartTime = moment(convertedStartTime).subtract(1, "years").format("MMM DD, YYYY hh:mm A");
    var frequency = Snapshot.val().frequency;
    var difference = moment().diff(start, "minutes");
    var remainder = difference % frequency;
    var minutes = frequency - remainder;
    var next = moment().add(minutes, "minutes").format("hh:mm A");
    
    $("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
        frequency + "</td><td>" + next + "</td><td>" + minutes + "</td></tr>");

});
