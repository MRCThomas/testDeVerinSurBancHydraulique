import express from 'express';
import * as http from 'http';
import { WebSocketServer }  from 'ws';

import cors from 'cors';
import { query } from "./services/db.js";
import jwt from 'jsonwebtoken';
import authMiddleware from './authentification-middleware.js';

const app = express();

app.use(cors());

app.get('/sauvegarde', (req, res, next) => {
    const DB_USER = "root"
    const DB_PWD = "root"
    const DB_HOST = "127.0.0.1"
    const dirPath = `./sauvegardes/${new Date().toLocaleDateString().replaceAll('/', '-')}`
    fs.mkdirSync(dirPath)
    const { exec } = require("child_process");
    const command = `mysqldump -u ${DB_USER} -p${DB_PWD} testverins -h ${DB_HOST}`
    console.log(command)
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
//app.use(authMiddleware)

app.get('/affaire/fake' ,function (req, res, next) {   // Route de simulation de données concernants les affaires 
    const data = []
    const essai = db.query("SELECT * from essai")  // On reçois tout les donnés d'une Affaires 
        result:
             result()
    res.json({essai});
})

app.post('/api/newAffaire', async (req, res, next) => {
    
    try {
        const IdUser = await query(`SELECT IdUser FROM users WHERE Identifiants = '${req.body.user}';`)
        console.log(req.body.user);
        //const result = await query("INSERT INTO affaire (`IdClient`,`IdUser`) VALUES ('1','"+IdUser+"');");
        //console.log(result);
        // res.json({
        //     'result': result
        // })

    } catch (error) {
        console.error(error);
    }
});

app.get('/api/getTableAffaires', async (req, res, next) => {
    try {
        const tableAffaires = await query('SELECT * FROM affaire');
        return res.json(tableAffaires);
    } catch (error) {
        console.error(error);
    }
});

app.get('/api/getTableEssais', async (req, res, next) => {

    try{
        const tableEssais = await query('SELECT * FROM essais');
        return res.json(tableEssais);
    } catch (error) {
        console.error(error);
    }
})

app.post('/api/login/',  async (req, res, next) =>  {     //Route pour vérifier la connexion du contrôleur
    const user = await query(`SELECT * FROM users WHERE Identifiants = '${req.body.username}';`);
    if(!user.length >= 1){
        return res.status(403).send();              //Retourne 403 pour une connexion échouée

    }
    if(user[0].MDP === req.body.pwd){
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
  wss.on('connection',(ws) => {
      ws.on('message',(message) => {
          console.log(`received : ${ message}`);
          ws.send(`Hello, you sent -> ${message}`);
      })

      ws.send(`Hi there, I am a WebSocket Server`);
  })
  
  server.listen(3000, () => {
    console.log('API TestVerin démarrée et disponible à l\'adresse : http://localhost:3000.');
  });
} catch (error) {
    console.error(error)    
}
