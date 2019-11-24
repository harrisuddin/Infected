var username; // this is the username of the player and is used in other JS files
var password;
var password2;
var loginSignupValid;
var error = document.getElementById("error");
var isGuest = false;

function Startup() {

    error.innerHTML = "";
    error.style.display = "none";
    document.getElementById("pw2").style.display = "none";
    document.getElementById("Topnav").style.display = "none";
    document.getElementById("Startgame").style.display = "none";
    document.getElementById("gameCanvas").style.display = "none";
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
    error.innerHTML = "";
    username = document.getElementById("un").value;
    password = document.getElementById("pw").value;
    password2 = document.getElementById("pw2").value;
    loginSignupValid = true;

    var isValidUsername = Username.isValid(username);
    if (isValidUsername !== true) {
        error.innerHTML += isValidUsername + "<br>";
        error.style.display = "block";
        loginSignupValid = false;
    }

    var isValidPassword = Password.isValid(password);
    if (isValidPassword !== true) {
        error.innerHTML += isValidPassword + "<br>";
        error.style.display = "block";
        loginSignupValid = false;
    }

    if (password != password2) {
        error.innerHTML += "Error, the passwords don't match." + "<br>";
        error.style.display = "block";
        loginSignupValid = false;
    }

    if (loginSignupValid) {

        var data = {
            "username": username,
            "password": password
        };

        $.ajax({
            async: false,
            type: 'POST',
            url: '/api/users/signup/',
            data: JSON.stringify(data),
            contentType: 'application/json',
            // success: function (result) {
            //     console.log(result);
            // },
            error: function (xhr, status, error) {
                var errorResponse = xhr.responseJSON;
                document.getElementById("error").innerHTML += errorResponse.message + "<br>";
                document.getElementById("error").style.display = "block";
                loginSignupValid = false;
            }
        });
    }

    if (loginSignupValid == true) {
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
    error.innerHTML = "";
    username = document.getElementById("un").value;
    password = document.getElementById("pw").value;
    loginSignupValid = true;

    var isValidUsername = Username.isValid(username);
    if (isValidUsername !== true) {
        error.innerHTML += isValidUsername + "<br>";
        error.style.display = "block";
        loginSignupValid = false;
    }

    var isValidPassword = Password.isValid(password);
    if (isValidPassword !== true) {
        error.innerHTML += isValidPassword + "<br>";
        error.style.display = "block";
        loginSignupValid = false;
    }

    if (loginSignupValid) {

        var data = {
            "username": username,
            "password": password
        };

        $.ajax({
            async: false,
            type: 'POST',
            url: '/api/users/login/',
            data: JSON.stringify(data),
            contentType: 'application/json',
            // success: function (result) {
            //     console.log(result);
            // },
            error: function (xhr, status, error) {
                var errorResponse = xhr.responseJSON;
                document.getElementById("error").innerHTML += errorResponse.message + "<br>";
                document.getElementById("error").style.display = "block";
                loginSignupValid = false;
            }
        });
    }

    if (loginSignupValid == true) {
        document.getElementById("Lbutton").style.display = "none";
        document.getElementById("Singupb").style.display = "none";
        document.getElementById("un").style.display = "none";
        document.getElementById("pw").style.display = "none";
        document.getElementById("pw2").style.display = "none";
        document.getElementById("Startgame").style.display = "inline";
        document.getElementById("Guest").style.display = "none";
    }

}

function Guest() {
    error.innerHTML = "";
    document.getElementById("Lbutton").style.display = "none";
    document.getElementById("Singupb").style.display = "none";
    document.getElementById("un").style.display = "none";
    document.getElementById("pw").style.display = "none";
    document.getElementById("pw2").style.display = "none";
    document.getElementById("Startgame").style.display = "inline";
    document.getElementById("Guest").style.display = "none";
    username = null;
    isGuest = true;
}


function startgame() {
    document.getElementById("startpagebox").style.display = "none";
    document.getElementById("Topnav").style.display = "block";
    document.getElementById("gameCanvas").style.display = "block";
    play();
}

function endScreen(){
    document.getElementById("startpagebox").style.display = "block";
    document.getElementById("Startgame").style.display = "inline";
}

onload = Startup;
