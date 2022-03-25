// Création d'une instance d'express
const { response } = require('express');
var express = require('express');
var cors = require('cors');
var app = express();
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
    const affaires = [
        { id: 24, name: "affaire3" },
        { id: 25, name: "affaire25" },
        { id: 45, name: "affaire45" },
        { id: 67, name: "affaire67" },
        { id: 34, name: "affaire34" },
        { id: 94, name: "affaire94" },

    ];
    const id = req.params.id;
    res.json(affaires.filter((e) => e.id == id));
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
