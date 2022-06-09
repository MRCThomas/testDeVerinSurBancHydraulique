//const SocketHelper = require('./js/socket');
let requestHeader = new Headers();
requestHeader.append("content-type", "application/json");
let userInput = document.getElementById("username");
let pwdInput = document.getElementById("password");
let connexionInput = document.getElementById("connexion");
let ipAdress = "localhost"; // IP du poste sur lequel le code est executer
connexionInput.addEventListener("click", (e) => {
    e.preventDefault();
    
    fetch("http://" + ipAdress + ":3000/api/login", {method : 'POST', headers : requestHeader,  body : JSON.stringify({ 
        "username": userInput.value,
        "pwd": pwdInput.value
    })})
        .then(response => {
            if(response.status == "200"){
                console.log(response);
                let token = response.json().then((token) => {
                    localStorage.setItem("Authorization", token.access_token);
                    window.location.href = "http://" + ipAdress + ":3000/affaireControleur.html"; //Redirection de page
                });
            }else{
                //Afficher un message d'erreur
            }
        })
    
        .catch(error => {
            console.log(error);
        })
});
