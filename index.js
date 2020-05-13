//init authentication
const config = {
  apiKey: "AIzaSyDlQyXlrv7JBQmE-rXfC-OEwwMOVlp3X3o",
  authDomain: "mtbsite-a56a6.firebaseapp.com",
  databaseURL: "https://mtbsite-a56a6.firebaseio.com",
  projectId: "mtbsite-a56a6",
  storageBucket: "mtbsite-a56a6.appspot.com",
  messagingSenderId: "319833836633",
  appId: "1:319833836633:web:8f9bd5d7ef18af24e5b548",
  measurementId: "G-YYGMDQ3MG9"
};
firebase.initializeApp(config);


function signIn(){
  
    var pswd = document.getElementById("inputPassword").value;
    var mail = document.getElementById("inputEmail").value;

    firebase.auth().signInWithEmailAndPassword(mail, pswd).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // Error Handling
      if(errorCode){
        showMessage(error.message);
      }
    });
}

//check if logged in correctly
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser){
      window.location.href = "main.html";
  }});

//button problem fix
$("#signinButton").click(e => {
  e.preventDefault();
  login();
});

function showMessage(tekst) {
  // show message 

  ErrorMessage.textContent= tekst;
  ErrorMessage.style.visibility = "visible";
}