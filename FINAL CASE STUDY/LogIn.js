var attempt = 0;

function logOut(){
    var logoutConfirmed = confirm("Are you sure you want to log out?");
    window.location.href = "index.html";
}

function LogIn(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username == "muhyeah@gmail.com" && password == "asdf"){
        window.location.href = "FinalCaseStudy.html";
    }else{
        attempt++
        if (attempt == 3){
            alert("Cannot login. Attempts exceeded!");
            document.getElementById("submit").disabled = true;
            document.getElementById("username").disabled = true;
            document.getElementById("password").disabled = true;
            document.getElementById("username").value = null;
            document.getElementById("password").value = null;
            return false;
        }else{
            alert("Incorrect inputs.");
            return false;
        }
    }
}