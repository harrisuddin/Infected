var Username;
var Password;
var Password2;
var Signupvalid = false;


function Startup(){
  document.getElementById("pw2").style.display="none";
}

//this function is to change the homepage to be able to signup the user
function signupfun() {
  document.getElementById("Singupb").setAttribute("onClick", "signupfun2()");
  document.getElementById("pw2").style.display="inline";
  document.getElementById("Lbutton").value="OR LOGIN";
  document.getElementById("Lbutton").setAttribute("onClick", "orlogin()");
}

//this function is for when the user is siging up
function signupfun2(){
  var Username = document.getElementById("un").value;
  var Password = document.getElementById("pw").value;
  var Password2 = document.getElementById("pw2").value;
if (Username=="" || Username.length>10){
  alert("Username has to be between 0 to 10 characters");
  Signupvalid = false;
} else {
document.getElementById("testun").innerHTML = Username;
Signupvalid = true;
}

if (Password=="" || Password.length>10){
  alert("Password has to be between 0 to 10 characters");
  Signupvalid = false;
} else {
  document.getElementById("testpw").innerHTML = Password;
  Signupvalid = true;
}

if (Password=="" || Password.length>10){
  alert("Re-enter Password has to be between 0 to 10 characters");
  Signupvalid = false;
} else {
  document.getElementById("testpw2").innerHTML = Password2;
  Signupvalid = true;
}

if(Password==Password2){
  Signupvalid = true;
}
  else{
alert("password must be same!");
Signupvalid = false;
}
  if (Signupvalid == true) {
    document.getElementById("startpagebox").style.display="none";
  }
}

function orlogin(){
  document.getElementById("pw2").style.display="none";
  document.getElementById("Lbutton").value="LOGIN";
  document.getElementById("Singupb").setAttribute("onClick", "signupfun()");
  document.getElementById("Lbutton").setAttribute("onClick", "loginfun()");
}


function loginfun() {
      var Username = document.getElementById("un").value;
      var Password = document.getElementById("pw").value;
      var Password2 = document.getElementById("pw2").value;
  document.getElementById("testun").innerHTML = Username;
  document.getElementById("testpw").innerHTML = Password;
  document.getElementById("testpw2").innerHTML = Password2;
  document.getElementById("startpagebox").style.display="none";
}


onload=Startup;
