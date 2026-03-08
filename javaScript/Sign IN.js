const SingIN = () => {
    UserNameInput = document.getElementById("Username-input")
    UserPasswordInput = document.getElementById("Password-input")


    /*If You Want to chnge Your User name then Only chnge Here:-*/  userName = "admin"
   /*If You Want to chnge Your password then Only chnge Here:-*/  Password = "admin123"


    if (UserNameInput.value == userName && UserPasswordInput.value == Password) {
        alert("Welcome! Login Successfully")
        window.location.assign("index.html")
    }
    else {
        alert("Login Failed. Please check your Username or Password.")
    };
}


// set defult valu :-
function defultValuSet() {
    UserNameInput = document.getElementById("Username-input")
    UserNameInput.setAttribute('value', 'admin');
    UserPasswordInput = document.getElementById("Password-input")
    UserPasswordInput.setAttribute('value', 'admin123');
}
defultValuSet()