// Création d'une instance d'express
import express from 'express';
import * as http from 'http';
import { WebSocketServer }  from 'ws';

import cors from 'cors';
import { query } from "./services/db.js";
import jwt from 'jsonwebtoken';
import authMiddleware from './authentification-middleware.js';

const app = express();

app.use(cors());
app.use(express.static('./../Application Web'), express.json()); //
//app.use(authMiddleware)

app.get('/affaire/fake' ,function (req, res, next) {   // Route de simulation de données concernants les affaires 
    const data = []
    for(let i = 0; i < 50;i++){
        data.push(Math.random() * 100);
    }
    res.json({data});
})

app.get('/api/testDB', async (req,res,next) => {
    const result = await query(`SELECT * FROM clients;`);
    res.json({ 
        'hello': 'world',
        'result': result
    });
})

app.post('/api/login/',  async (req, res, next) =>  {     //Route pour vérifier la connexion du contrôleur
    const user = await query(`SELECT * FROM users WHERE Identifiants = '${req.body.username}';`)
    console.log(user);
    if(!user){
        return res.status(403).send();                  //Retourne 403 pour une connexion échouée
    }
    if(user.pwd === req.body.pwd){
        let token = jwt.sign({ user: user}, 'secret'); //Délivre un token d'authentification
        return res.status(200).json({"access_token" : token});             //Retourne 200 pour une connexion réussie
    }else{
        return res.status(403).send();
    }
});

// Si la page n'est pas reconnu
app.use(function (req, res, next) {
    res.status(404).send("Désolé cette page n'existe pas, veuillez reformuler votre demande)");
});


try {
    

const server = http.createServer(app);
console.log(`Démarrage du serveur HTTP`);
const wss = new WebSocketServer({ server });
console.log(`Démarrage du serveur WebSocket`);
console.log(wss);
wss.on('connection',(ws) => {
    ws.on('message',(message) => {
        console.log(`received : ${ message}`);
        ws.send(`Hello, you sent -> ${message}`);
    })

    ws.send(`Hi there, I am a WebSocket Server`);
})

// Lance le serveur sur le port 3000 (HTTP)
server.listen(3000, () => {
    console.log('API TestVerin démarrée et disponible à l\'adresse : http://localhost:3000.');
});

} catch (error) {
    console.error(error)    
}