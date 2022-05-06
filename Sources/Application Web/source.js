//const SocketHelper = require('./js/socket');
let requestHeader = new Headers();
requestHeader.append("content-type", "application/json");
let userInput = document.getElementById("username");
let pwdInput = document.getElementById("password");
let connexionInput = document.getElementById("connexion");
let addAffaire = document.getElementById("addAffaireButton");
connexionInput.addEventListener("click", (e) => {
    e.preventDefault();
    
    fetch("http://localhost:3000/api/login", {method : 'POST', headers : requestHeader,  body : JSON.stringify({ 
        "username": userInput.value,
        "pwd": pwdInput.value
    })})
        .then(response => {
            if(response.status == "200"){
                let token = response.json.token;
                localStorage.setItem("Authorization", 'Bearer ' + token);
                window.location.href = "http://localhost:3000/affaireControleur.html"; //Redirection de page
            }else{
                //Afficher un message d'erreur
            }
        })
    
        .catch(error => {
            console.log(error);
        })
});

addAffaire.addEventListener("click", (e) => {

    
})
