

//initialise authentication
var config={
    apiKey: "AIzaSyDlQyXlrv7JBQmE-rXfC-OEwwMOVlp3X3o",
    authDomain: "mtbsite-a56a6.firebaseapp.com",
    databaseURL: "https://mtbsite-a56a6.firebaseio.com",
    projectId: "mtbsite-a56a6",
    storageBucket: "mtbsite-a56a6.appspot.com",
    messagingSenderId: "319833836633",
  appId: "1:319833836633:web:8f9bd5d7ef18af24e5b548",
  measurementId: "G-YYGMDQ3MG9"
}
firebase.initializeApp(config);

//init database
var database = firebase.database();
var userId;
var mail;




//check if correctly logged in
firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        userId = firebase.auth().currentUser.uid;
        mail = firebase.auth().currentUser.email;
        loadData();
    } else{
        window.location.href = "index.html";
    }
  });

// write data from database
//RALLY data
firebase.database().ref('rally/host').once('value').then(function(snapshot) {
    rallyHost.textContent= "Rally added by:   "  +snapshot.val();
  });
firebase.database().ref('rally/link').once('value').then(function(snapshot) {
    rallyLinkButton.href = snapshot.val();
  });  
//TABLE data
var linkList;
var table = document.createElement("table");
table.className="table";
var fragment = document.getElementById("TableID");
//create head of table
var trHead = document.createElement("tr");
var trHeadValues = ["Participant","Prediction","Result","Error","Strava"];
for (var i = 0; i < 5; i++) {
    var th = document.createElement("th");

    th.textContent = trHeadValues[i];
    trHead.appendChild(th);
  }
table.appendChild(trHead);

//create table body
var ref = database.ref('users').orderByChild('id');
ref.once('value',function(snap) {
    snap.forEach(function(item) {
        var userData = item.val();
        var error = userData.prediction - userData.result;
        
        var tr = document.createElement("tr");
        var trValues = [userData.username, userData.prediction,userData.result,Math.round(Math.abs(error)*100)/100,userData.link];
        for (var i = 0; i < trValues.length-1; i++) {
            var td = document.createElement("td");
      
            td.textContent = trValues[i];
            tr.appendChild(td);
          }
          //stravaButton
          if(trValues[4] != null){
          var buttonCreation = document.createElement("a");
          buttonCreation.className ="btn btn-primary stravaBut tableBut";
          buttonCreation.innerHTML ="Open";
          buttonCreation.href = trValues[4];
          buttonCreation.target="_blank";
          tr.appendChild(buttonCreation);
            }
          table.appendChild(tr);
    });
});

fragment.appendChild(table);

//endTable

function logout(){
    firebase.auth().signOut();
    window.location.href = "index.html";
}

function loadData(){
//fill in data
userID.textContent = userId;
userMail.textContent = mail;
}

function editData(){
    var prediction = document.getElementById("predictionEdit").value;
    var result = document.getElementById("resultEdit").value;
    var link = document.getElementById("linkEdit").value;

    //send data to database
    if(prediction != "") database.ref('users/' + userId + '/prediction').set(prediction);
    if(result != "") database.ref('users/' + userId + '/result').set(result);
    if(link != "") database.ref('users/' + userId + '/link').set(link);
    
    location.reload();
}