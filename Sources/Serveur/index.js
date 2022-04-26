// Création d'une instance d'express
const { response } = require('express');
const express = require('express');
const cors = require('cors');
const db = require("./services/db.js")
const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const app = express();
app.use(cors());
app.use(express.static('./../Application Web'), express.json()); //

app.get('/api/affaire/fake' , function (req, res, next) {   // Route de simulation de données concernants les affaires 
    const data = []
    for(let i = 0; i < 50;i++){
        data.push(Math.random() * 100);
    }
    res.json({data});
})

app.get('/api/affaire/:id', async (req, res, next) =>  {
    const users = await db.query("SELECT * from users;");
    console.log(users);
    const id = req.params.id;
    res.json(users);
})

app.post('/api/login/', function (req, res, next) {     //Route pour vérifier la connexion du contrôleur
    const users = [                                     //Simulation de la table 'Users' de la base de données
        {username: "root", pwd: "root"},
        {username: "admin", pwd: "1234"},
    ];
    const found = users.find(u=>u.username === req.body.username);
    if(!found){
        return res.status(403).send();                  //Retourne 403 pour une connexion échouée
    }
    if(found.pwd === req.body.pwd){
        let token = jwt.sign({ user: found}, 'secret'); //Délivre un token d'authentification
        return res.status(200).json(token);             //Retourne 200 pour une connexion réussie
    }else{
        return res.status(403).send();
    }
});
app.get('/affaireControleur.html', function (req, res, next) {
    jwt.verify(token, 'secret', function(error, decoded){
        console.log(res.status);
        return res.status(200).send();
    })
    return res.status(403).send();
})
// Si la page n'est pas reconnu
app.use(function (req, res, next) {
    res.status(404).send("Désolé cette page n'existe pas, veuillez reformuler votre demande)");
});

// Lance le serveur sur le port 3000
const server = app.listen(3000, function () {
    console.log('example app listening on port 3000.');
});

const wsServer = new WebSocket.Server({noServer : true, path :"/ws"});

server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, (websocket) => {
        wsServer.emit("connection", websocket, request);
    });
});

wsServer.on('connexion',(socket, req )=>{
    console.log('socket',socket);
    console.log('req',req);
})