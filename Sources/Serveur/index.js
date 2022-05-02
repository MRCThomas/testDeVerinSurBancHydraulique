// Création d'une instance d'express
import express from 'express';
import cors from 'cors';
import db from "./services/db.js";
import WebSocket from 'ws';
import jwt from 'jsonwebtoken';
import authMiddleware from './authentification-middleware.js';
import { Server }  from 'http';
import * as io from 'socket.io';
const app = express();
const serveur = Server(app);
const wsServeur = new io.Server(serveur);

app.use(cors());
app.use(express.static('./../Application Web'), express.json()); //
app.use(authMiddleware)
app.get('/affaire/fake' ,function (req, res, next) {   // Route de simulation de données concernants les affaires 
    const data = []
    for(let i = 0; i < 50;i++){
        data.push(Math.random() * 100);
    }
    res.json({data});
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

// Si la page n'est pas reconnu
app.use(function (req, res, next) {
    res.status(404).send("Désolé cette page n'existe pas, veuillez reformuler votre demande)");
});


// Lance le serveur sur le port 3000 (WS)
wsServeur.on('connection', (socket) =>{
    console.log(`Connecté au client ${socket.id}`)
 })

// Lance le serveur sur le port 3000 (HTTP)
serveur.listen(3000, function () {
    console.log('API TestVerin démarrée et disponible à l\'adresse : http://localhost:3000.');
});
