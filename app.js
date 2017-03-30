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
    var nam = Snapshot.val().name;
    var dest = Snapshot.val().destination;
    var star = Snapshot.val().start;
    var convertedTime = moment(convertedTime).subtract(1, "years").format("MMM DD, YYYY hh:mm A");
    var freq = Snapshot.val().frequency;
    var diff = moment().diff(star, "minutes");
    var remain = diff % freq;
    var min = freq - remain;
    var nextTime = moment().add(min, "minutes").format("hh:mm A");
    
    $("#train-table > tbody").append("<tr><td>" + nam + "</td><td>" + dest + "</td><td>" +
        freq + "</td><td>" + nextTime + "</td><td>" + min + "</td></tr>");

});
