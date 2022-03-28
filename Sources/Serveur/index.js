// Création d'une instance d'express
const { response } = require('express');
var express = require('express');
var cors = require('cors');
var app = express();
const db = require("./services/db.js")
app.use(cors());
app.use(express.static('./../Application Web'), express.json()); //

app.post('/welcome', function (req, res) {
    console.log(req.body);
    res.json({
        "hello": req.body.name
    })
})
app.get('/api/affaire/fake' , function (req, res, next) {
    const data = []
    for(let i = 0; i < 50;i++){
        data.push(Math.random() * 100);
    }
    res.json({data});
})

app.get('/api/affaire/:id', function (req, res, next) {
    const affaires = db.query("SELECT * from affaire;")
    const id = req.params.id;
    res.json(affaires);
})
// Si la page n'est pas reconnu
app.use(function (req, res, next) {
    res.status(404).send("Désolé cette page n'existe pas, veuillez reformuler votre demande)");
});

// Lance le serveur sur le port 3000
app.listen(3000, function () {
    console.log('example app listening on port 3000.');
});
