const { response } = require("express");

let userInput = document.getElementById("username");
let pwdInput = document.getElementById("password");
let connexionInput = document.getElementById("connexion");

connexionInput.addEventListener("click", (e) => {
    fetch('http://localhost:3000/api/login')
        .then(response => {

        })
        .catch(error => {
            console.log(error); 
        });
})
    