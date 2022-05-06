// Création d'une instance d'express

import express from 'express';
import cors from 'cors';
import { query } from "./services/db.js";
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
    const essai = db.query("SELECT * from essai")  // On reçois tout les donnés d'une Affaires 
        result:
             result()
    res.json({essai});
})

app.get('/api/testDB', async (req,res,next) => {
    const result = await query(`SELECT * FROM clients;`);
    res.json({ 
        'hello': 'world',
        'result': result
    });

})

app.post('/api/login/',  async (req, res, next) =>  {     //Route pour vérifier la connexion du contrôleur
    console.log(`SELECT * FROM users WHERE Identifiants = '${req.body.username}';`);
    const user = await query(`SELECT * FROM users WHERE Identifiants = ${req.body.username};`)
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


// Lance le serveur sur le port 3000 (WS)
wsServeur.on('connection', (socket) =>{
    console.log(`Connecté au client ${socket.id}`)
 })

// Lance le serveur sur le port 3000 (HTTP)
serveur.listen(3000, function () {
    console.log('API TestVerin démarrée et disponible à l\'adresse : http://localhost:3000.');
});
