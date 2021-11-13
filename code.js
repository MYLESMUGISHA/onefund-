
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


const auth = firebase.auth();

function signIn() {

    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.catch(
        (e) =>
        (document.getElementById("errorMessage").innerHTML =
            "Wrong Password or Email !")
    );
}

function signOut() {

    auth.signOut();

    signInForm.style.display = "block";
    
    contactSection.style.display = "none";

}



auth.onAuthStateChanged((user) => {

    if (user) {

        // Everything inside here happens if user is signed in

        signInForm.style.display = "none";
  
        contactSection.style.display = "block";
        
       

    } else {
        // Everything inside here happens if user is not signed in
        console.log("not signed in");
    }
});


