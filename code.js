
// import { initializeApp } from 'firebase/app';

  const firebaseConfig = {
    apiKey: "AIzaSyDLBP1lnEf9n8aLH-rA34zhGDoS5MvpoN0",
    authDomain: "onefund-c9304.firebaseapp.com",
    databaseURL: "https://onefund-c9304-default-rtdb.firebaseio.com",
    projectId: "onefund-c9304",
    storageBucket: "onefund-c9304.appspot.com",
    messagingSenderId: "356114533576",
    appId: "1:356114533576:web:d207c9367f7e297084a9fd",
    measurementId: "G-GJNQK07T06"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference firebase service 
let smsRef = firebase.database();

// creating message reference in database

let messagesRef = smsRef.ref("messages");


// Listen for form submit

let contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", submitForm);
// console.log("clicked");

// Submit form
function submitForm(e) {
    e.preventDefault();

    // Get values
 var name = getInputVal("fname");
    var email = getInputVal("user-email");
    var message = getInputVal("subject");   

    // Save message
    saveMessage(name, email, message);
    console.log(name, email, message);
    // Show alert
    document.getElementById("alert-message").style.display = "block";

    // Hide alert after 3 seconds
    setTimeout(() =>{
        document.getElementById("alert-message").style.display = "none";
    
    }, 3000)

    // Clear form

   document.getElementById("fname").value = " "; 
   document.getElementById("user-email").value = " "; 
   document.getElementById("subject").value = " "; 
    // document.getElementById("contactForm").reset();
    // return false;
}

// Function to get get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, email, message) {
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        name: name,
        email: email,
        message: message,
    });
}

//authentication

// Access the forms for email and password authentication

const contactSection= document.getElementById("contact");
const email = document.getElementById("email");
const password = document.getElementById("password");
const signInForm = document.getElementById("form");
const errorAlert = document.getElementById("errorMessage");
const resetMessage = document.getElementById("resetMessage");
const forgetPasswordForm = document.getElementById("forgot");


const auth = firebase.auth();

function signIn() {

    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.catch(
        (e) =>
        (
            
            errorAlert.innerHTML = "Wrong Password or Email !") 
    );
}

// function for signing out 

function signOut() {
    auth.signOut();
    contactSection.style.display = "none";
    signInForm.style.display = "block";
    // window.location.href = 'index.html';

}

auth.onAuthStateChanged((user) => {

    if (user) {

        // Everything inside here happens if user is signed in

        signInForm.style.display = "none";
        contactSection.style.display = "block";
        // myNavBar.style.display = "block";

    } else {

        // Everything inside here happens if user is not signed in
        console.log("not signed in");
    }
});


// sign up functionality 

function signUp(){

    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    promise.catch(error => {
        alert(error.message);
        
    })
}

// sign in with Google 

// initiate a provider

 let provider = new firebase.auth.GoogleAuthProvider(); 

// function for signing in with google 

function googleSignIn(){

    firebase.auth().signInWithPopup(provider).then(result =>{

      alert('You havae successfully logged in with google')

    }).catch(error => console.log(error.message)
    )
}

// forget password functionality 

// displaying the reset password form

function showEmailForm(){
    signInForm.style.display = "none";
    forgetPasswordForm.style.display = "block";
}

// forget password form submit event 

forgetPasswordForm.addEventListener('submit', function(e){

    e.preventDefault()
    //glab value from the form
    
    let emailAdress = document.getElementById("forgot-password-email").value;
    
    //send value to firebase
    
    firebase.auth().sendPasswordResetEmail(emailAdress).then(() => {
    
    // what we need todo here
    forgetPasswordForm.style.display = "none";
    resetMessage.innerHTML = "Please Check your inbox or your spam folder to reset your password !"
    
    
    }).catch(error => {
    
        errorAlert.innerHTML = "Please make your email properly !"
    
        console.log(error);
    })
    
    })


