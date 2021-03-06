import express from 'express';
import * as http from 'http';
import { WebSocketServer } from 'ws';

import cors from 'cors';
import { query } from "./services/db.js";
import jwt from 'jsonwebtoken';
import { spawn } from 'child_process';
import authMiddleware from './authentification-middleware.js';
import Importer from 'mysql-import';
import { join,dirname } from 'path';

import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());


app.get('/restaurationVierge', (req, res, next) => {
    const host = 'localhost';
    const user = 'root';
    const password = 'root';
    //const database = 'testverins';

    const importer = new Importer({ host, user, password });

    // New onProgress method, added in version 5.0!
    importer.onProgress(progress => {
        var percent = Math.floor(progress.bytes_processed / progress.total_bytes * 10000) / 100;
        console.log(`${percent}% Completed`);
    });

    importer.import(join(__dirname,'./sauvegardes/BddVierge/testverins.sql')).then(() => {
        var files_imported = importer.getImported();
        console.log(`${files_imported.length} SQL file(s) imported.`);
        res.send('completed');
    }).catch(err => {
        console.error(err);
    });
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

        const sentFilePath = path.join(__dirname, dirPath);
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


app.use(express.static('./../Application Web'), express.json()); 
app.use(authMiddleware);

app.get('/affaire/fake', function (req, res, next) {   // Route de simulation de données concernants les affaires 
    const data = []
    const essai = db.query("SELECT * from essai")  // On reçois tout les donnés d'une Affaires 
    result:
    result()
    res.json({ essai });
})

app.post('/api/newAffaire', async (req, res, next) => {

    try {
        let clientTable = await query(`SELECT * FROM clients WHERE Entreprise = "${req.body.Entreprise}"`);
        console.log(clientTable);
         if(!clientTable[0]){
             await query(`INSERT INTO clients (Entreprise, NbAffaires) VALUES ("${req.body.Entreprise}", 0)`);
             clientTable = await query(`SELECT * FROM clients WHERE Entreprise = "${req.body.Entreprise}"`);
             
         }
         await query(`INSERT INTO affaire (IdClient, IdUser) VALUES (${clientTable[0].IdClient}, ${req.app.locals.user.IdUser})`);
         await query(`UPDATE clients SET NbAffaires = ${clientTable[0].NbAffaires + 1} WHERE IdClient = ${clientTable[0].IdClient}`);
    } catch (error) {
        console.error(error);
        return res.status(403).json({"error": error});
    }
    return res.status(200).send();
});

app.get('/api/getTableAffaires', async (req, res, next) => {    //Route pour recupérer affaire
    try {
        const tableAffaires = await query('SELECT * FROM affaire INNER JOIN clients ON affaire.IdClient = clients.IdClient;');
        return res.json(tableAffaires);
    } catch (error) {
        console.error(error);
    }
});

app.get('/api/getTableEssais/:id', async (req, res, next) => {

    try {
        const id = req.params.id;
        const tableEssais = await query(`SELECT * FROM essais WHERE IdAffaire = ${id}`);
        return res.json(tableEssais);
    } catch (error) {
        console.error(error);
    }
})

app.post('/api/login/', async (req, res, next) => {     //Route pour vérifier la connexion du contrôleur
    const user = await query(`SELECT * FROM users WHERE Identifiants = '${req.body.username}';`);
    if (!user.length >= 1) {
        return res.status(403).send();              //Retourne 403 pour une connexion échouée

    }
    if (user[0].MDP === req.body.pwd) {
        delete user[0].MDP;
        console.log('user',user[0])
        let token = jwt.sign({ user: user[0] }, 'secret'); //Délivre un token d'authentification
        return res.status(200).json({ "access_token": token });             //Retourne 200 pour une connexion réussie
    } else {
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
    wss.on('connection', (ws) => {
        ws.on('message', (message) => {
            console.log(`received : ${message}`);
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
