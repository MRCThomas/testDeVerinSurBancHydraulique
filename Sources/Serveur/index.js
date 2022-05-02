// Création d'une instance d'express
const { response } = require('express');
const express = require('express');
const cors = require('cors');
const db = require("./services/db.js");
const jwt = require('jsonwebtoken');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(cors());
app.use(express.static('./../Application Web'), express.json()); //

app.get('/api/affaire/fake' , function (req, res, next) {
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
        let token = jwt.sign({ user: found}, 'secret');
        return res.status(200).json(token);
    }else{
        return res.status(403).send();
    }
});

// Si la page n'est pas reconnu
app.use(function (req, res, next) {
    res.status(404).send("Désolé cette page n'existe pas, veuillez reformuler votre demande)");
});


// Lance le serveur sur le port 3000 (WS)
io.on('connection', (socket) =>{
    console.log(`Connecté au client ${socket.id}`)
 })

// Lance le serveur sur le port 3000 (HTTP)
server.listen(3000, function () {
    console.log('API TestVerin démarrée et disponible à l\'adresse : http://localhost:3000.');
});

