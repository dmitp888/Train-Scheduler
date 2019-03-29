// 1. Initialize Firebase

var config = {
    apiKey: "AIzaSyC89guZE2XVD70bxie335R_6SiN1xTKI7Y",
    authDomain: "train-sheduler-111307.firebaseapp.com",
    databaseURL: "https://train-sheduler-111307.firebaseio.com",
    projectId: "train-sheduler-111307",
    storageBucket: "train-sheduler-111307.appspot.com",
    messagingSenderId: "652274014777"
  };
  firebase.initializeApp(config);


  // Assigning the reference to the database to a variable named 'database'
  var database = firebase.database();

  // 2. Button for adding new trains
$("#add-Train-btn").on( "click", function(event) {
    event.preventDefault();

      // Grabs user input
  var trainName = $("#Train-name-input").val().trim();
  var TDestination = $("#Destination-input").val().trim();
  var ftrain = moment($("#ftrain-input").val().trim()) .format("HH:mm - military time");
  var Tfrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding trains data
  var newTrain = {
    name: trainName,
    destination: TDestination,
    firsttrain: ftrain,
    frequency: Tfrequency
  };

  // Uploads trains data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firsttrain);
  console.log(newTrain.frequency);

  alert("New train successfully added");

  // Clears all of the text-boxes
  $("#Train-name-input").val("");
  $("#Destination-input").val("")
  $("#ftrain-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
      // Store everything into a variable.
      var trainName = childSnapshot.val().name;
    var TDestination = childSnapshot.val().destination;
      var ftrain = childSnapshot.val().firsttrain;
      var Tfrequency = childSnapshot.val().frequency;
      // Train Info
  console.log(trainName);
  console.log(TDestination);
  console.log(ftrain);
  console.log(Tfrequency);


    // Assumptions

    var Tfrequency;

    // Trains start at 5-30
    var firstTime = "05:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % Tfrequency;
    console.log(tRemainder);

    // Minutes Until Train
    var tMinutesTillTrain = Tfrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var arrivalnext= moment(nextTrain).format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

      // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(TDestination),
    $("<td>").text(Tfrequency),
    $("<td>").text(arrivalnext),
    $("<td>").text(tMinutesTillTrain),

  );
  // Append the new row to the table
  $("#Train-table > tbody").append(newRow);
});
