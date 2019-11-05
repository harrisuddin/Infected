
var Username;
var Password;
var Password2;
var Signupvalid = true;


function Startup(){
  document.getElementById("pw2").style.display="none";
}

//this function is to change the homepage to be able to signup the user
function signupfun() {
  document.getElementById("Singupb").setAttribute("onClick", "signupfun2()");
  document.getElementById("pw2").style.display="block";
  document.getElementById("Lbutton").value="OR LOGIN";
}

//this function is for when the user is siging up
function signupfun2(){
if (Username=="" || Username.length>10){
  alert("Username has to be between 0 to 10 characters");
} else {
document.getElementById("testun").innerHTML = Username;
}

if (Password=="" || Password.length>10){
  alert("Password has to be between 0 to 10 characters");
} else {
  document.getElementById("testpw").innerHTML = Password;
}

if (Password=="" || Password.length>10){
  alert("Re-enter Password has to be between 0 to 10 characters");
} else {
  document.getElementById("testpw2").innerHTML = Password2;
}

if(Password==Password2){
return true;
}
else{
alert("password must be same!");
}
  if (Signup_valid == true) {
    document.getElementById("startpagebox").style.display="none";
  }
}

function loginfun() {
  if (document.getElementById("Lbutton").value="OR LOGIN") {
    document.getElementById("pw2").style.display="none";
    document.getElementById("Lbutton").value="LOGIN";
    document.getElementById("Singupb").setAttribute("onClick", "signupfun()");
  }
    if (document.getElementById("Lbutton").value="LOGIN") {
      var Username = document.getElementById("un").value;
      var Password = document.getElementById("pw").value;
      var Password2 = document.getElementById("pw2").value;
  document.getElementById("testun").innerHTML = Username;
  document.getElementById("testpw").innerHTML = Password;
  document.getElementById("testpw2").innerHTML = Password2;
  document.getElementById("startpagebox").style.display="none";
}

}


onload=Startup;
