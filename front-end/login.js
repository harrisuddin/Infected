var Username;
var Password;
var Password2;
var Signupvalid;
var Counter = 0;


function Startup() {
    document.getElementById("pw2").style.display = "none";
    document.getElementById("Topnav").style.display = "none";
    document.getElementById("player").style.display = "none";
    document.getElementById("player2").style.display = "none";
    document.getElementById("Startgame").style.display = "none";
    document.getElementById("game").style.display = "none";
}

function topnav() {
    var x = document.getElementById("Topnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

//this function is to change the homepage to be able to signup the user
function signupfun() {
    document.getElementById("Singupb").setAttribute("onClick", "signupfun2()");
    document.getElementById("pw2").style.display = "inline";
    document.getElementById("Lbutton").value = "OR LOGIN";
    document.getElementById("Lbutton").setAttribute("onClick", "orlogin()");
    document.getElementById("Guest").style.display = "none";
}

//this function is for when the user is siging up
function signupfun2() {
    var Username = document.getElementById("un").value;
    var Password = document.getElementById("pw").value;
    var Password2 = document.getElementById("pw2").value;
    if (Username == "" || Username.length > 10) {
        alert("Username has to be between 0 to 10 characters");
        Signupvalid = false;
    } else {
        Signupvalid = true;
    }

    if (Password == "" || Password.length > 10) {
        alert("Password has to be between 0 to 10 characters");
        Signupvalid = false;
    } else {
        Signupvalid = true;
    }

    if (Password2 == "" || Password2.length > 10) {
        alert("Re-enter Password has to be between 0 to 10 characters");
        Signupvalid = false;
    } else {
        Signupvalid = true;
    }


    if (Signupvalid == true) {
        document.getElementById("Lbutton").style.display = "none";
        document.getElementById("Singupb").style.display = "none";
        document.getElementById("un").style.display = "none";
        document.getElementById("pw").style.display = "none";
        document.getElementById("pw2").style.display = "none";
        document.getElementById("Startgame").style.display = "inline";
    }
}

function orlogin() {
    document.getElementById("pw2").style.display = "none";
    document.getElementById("Lbutton").value = "LOGIN";
    document.getElementById("Singupb").setAttribute("onClick", "signupfun()");
    document.getElementById("Lbutton").setAttribute("onClick", "loginfun()");
    document.getElementById("Guest").style.display = "inline";
}


function loginfun() {
    var Username = document.getElementById("un").value;
    var Password = document.getElementById("pw").value;
    document.getElementById("Lbutton").style.display = "none";
    document.getElementById("Singupb").style.display = "none";
    document.getElementById("un").style.display = "none";
    document.getElementById("pw").style.display = "none";
    document.getElementById("pw2").style.display = "none";
    document.getElementById("Startgame").style.display = "inline";
    document.getElementById("Guest").style.display = "none";
}

function Guest() {
  document.getElementById("Lbutton").style.display = "none";
  document.getElementById("Singupb").style.display = "none";
  document.getElementById("un").style.display = "none";
  document.getElementById("pw").style.display = "none";
  document.getElementById("pw2").style.display = "none";
  document.getElementById("Startgame").style.display = "inline";
  document.getElementById("Guest").style.display = "none";
  Guestname = Counter;
  Counter++;
}


function startgame() {
    document.getElementById("startpagebox").style.display = "none";
    document.getElementById("Topnav").style.display = "block";
    document.getElementById("player").style.display = "block";
    document.getElementById("player2").style.display = "block";
    document.getElementById("game").style.display = "block";
    play();

}


onload = Startup;
