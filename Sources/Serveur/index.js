// Création d'une instance d'express
const { response, query } = require('express');
const express = require('express');
const cors = require('cors');
const db = require("./services/db.js")
const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const path = require('path');
const app = express();
const fs = require('fs');
app.use(cors());


app.get('/restaurationVierge', (req, res, next) => {
    // on définie nos variables
    const DB_USER = "root"
    const DB_PWD = "root"
    const DB_HOST = "127.0.0.1"
    const dirPath = `./sauvegardes/BddVierge`
    const { exec } = require("child_process");
    const verif = `mysqlquery( 'SHOW DATABASE LIKE "testverins" 'or die(mysql_error()))`;
    const drop = query( `DROP DATABASE testverins` )
    drop
    const command = `mysql -u ${DB_USER} -p${DB_PWD}  -h ${DB_HOST} ` 
    console.log(command)   
    exec(`${command} ${verif}`),(error)=> {
    if( error ){
        console.log('ici!')
         // on restaure la sauvegardes testverins.sql dans le dossier BddVierge
        exec(`${command} testverins < ${dirPath}/testverins.sql`, (error, stdout, stderr) => { 
            if (error) {
                next(error)
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
            }
       
        })
    }
    else{
        exec(`${command} DROP DATABASE testverins`), (error) => {
            console.log('la!')
        }
    }
}
})



app.get('/sauvegarde', (req, res, next) => {
    // on définie nos variables
    const DB_USER = "root"
    const DB_PWD = "root"
    const DB_HOST = "127.0.0.1"
    const dirPath = `./sauvegardes/${new Date().toLocaleDateString().replaceAll('/', '-')}`
    fs.mkdirSync(dirPath)  // On créér un dossier à l'emplacement voulu
    const { exec } = require("child_process");
    const command = `mysqldump -u ${DB_USER} -p${DB_PWD} testverins -h ${DB_HOST}` 
    console.log(command)
    // on créer la sauvegardes testverins.sql dans le dossier créé Précédement
    exec(`${command} > ${dirPath}/testverins.sql`, (error, stdout, stderr) => { 
        if (error) {
            next(error)
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }

        const sentFilePath = path.join(__dirname,dirPath);
        res.sendFile(`${sentFilePath}/testverins.sql`, function (err) {
            console.log('ici !')
            if (err) {
                next(err);
            } else {
                console.log('Sent:');
            }
        });
    })
})

app.use(express.static('./../Application Web'), express.json()); //

app.get('/api/affaire/fake', function (req, res, next) {
    const data = []
    for (let i = 0; i < 50; i++) {
        data.push(Math.random() * 100);
    } -
        res.json({ data });
})

app.get('/api/affaire/:id', async (req, res, next) => {
    const users = await db.query("SELECT * from users;");
    console.log(users);
    const id = req.params.id;
    res.json(users);
})
//Route API pour vérifier la connexion du contrôleur
app.post('/api/login/', function (req, res, next) {
    const users = [
        { username: "root", pwd: "root" },
        { username: "admin", pwd: "1234" },
    ];
    const found = users.find(u => u.username === req.body.username);
    if (!found) {
        return res.status(403).send();
    }
    if (found.pwd === req.body.pwd) {
        let token = jwt.sign({ user: found }, 'secret');
        return res.status(200).json(token);
    } else {
        return res.status(403).send();
    }
});

// Si la page n'est pas reconnu
app.use(function (req, res, next) {
    res.status(404).send("Désolé cette page n'existe pas, veuillez reformuler votre demande)");
});

// Lance le serveur sur le port 3000
const server = app.listen(3000, function () {
    console.log('example app listening on port 3000.');
});

const wsServer = new WebSocket.Server({ noServer: true, path: "/ws" });

server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, (websocket) => {
        wsServer.emit("connection", websocket, request);
    });
});

wsServer.on('connexion', (socket, req) => {
    console.log('socket', socket);
    console.log('req', req);
})