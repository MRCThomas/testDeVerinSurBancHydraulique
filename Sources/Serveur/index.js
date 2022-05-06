// Création d'une instance d'express
const { response } = require('express');
var express = require('express');
var cors = require('cors');
var app = express();
const db = require("./services/db.js");
const { json } = require('express/lib/response');
app.use(cors());
app.use(express.static('./../Application Web'), express.json()); //

app.post('/welcome', function (req, res) {
    console.log(req.body);
    res.json({
        "hello": req.body.name
    })
})
app.get('/api/essai' , function (req, res, next) {
    const data = []
    const essai = db.query("SELECT * from essai")  // On reçois tout les donnés d'une Affaires 
        result:
             result()
    res.json({essai});
})


app.get('/api/affaire/:id', function (req, res, next) {
    const affaires = db.query("SELECT * from affaire;")
    const id = req.params.id;
    res.json(affaires);
})
//Route API pour vérifier la connexion du contrôleur
app.post('/api/login/', function (req, res, next) {
    const users = [
        {username: "root", pwd: "root"},
        {username: "admin", pwd: "1234"},
    ];
    const found = users.find(u=>u.username === req.body.username);
    if(!found){
        return res.status(403).send();
    }
    if(found.pwd === req.body.pwd){
        return res.status(200).send();
    }else{
        return res.status(403).send();
    }
});

// Si la page n'est pas reconnu
app.use(function (req, res, next) {
    res.status(404).send("Désolé cette page n'existe pas, veuillez reformuler votre demande)");
});

// Lance le serveur sur le port 3000
app.listen(3000, function () {
    console.log('example app listening on port 3000.');
});
