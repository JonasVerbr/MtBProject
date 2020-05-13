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
var name;
var mail;

//register new user
function register(){
    const pswd = document.getElementById("inputPassword").value;
    const pswd2 = document.getElementById("inputPassword2").value;
    mail = document.getElementById("inputEmail").value;
    name = document.getElementById("inputName").value;
    const auth = firebase.auth();

    if(pswd === pswd2){
        const promise = auth.createUserWithEmailAndPassword(mail, pswd);
        promise.catch(e => showMessage(e.message));
    }
    else{
        showMessage("You entered 2 different passwords!");
    }
}

//check if correctly logged in
firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        //save user information
        userId = firebase.auth().currentUser.uid;
        writeUserData(name,mail);
        
        //proceed to webpage
        window.location.href = "main.html";
        
    }
});


//button problem fix
$("#registerButton").click(e => {
    e.preventDefault();
    login();
  });

  function showMessage(tekst) {
    // show message 
  
    ErrorMessage.textContent= tekst;
    ErrorMessage.style.visibility = "visible";
  }

  function writeUserData(name,email) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        mail: email
    });
    
  }