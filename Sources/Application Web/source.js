//const SocketHelper = require('./js/socket');
let requestHeader = new Headers();
requestHeader.append("content-type", "application/json");
let userInput = document.getElementById("username");
let pwdInput = document.getElementById("password");
let connexionInput = document.getElementById("connexion");

connexionInput.addEventListener("click", (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/login", {method : 'POST', headers : requestHeader,  body : JSON.stringify({ 
        "username": userInput.value,
        "pwd": pwdInput.value
    })})
        .then(response => response.json())
        .catch(error => {
            console.log(error);
        });
});


