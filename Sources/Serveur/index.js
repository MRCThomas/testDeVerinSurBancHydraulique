import express, { response } from 'express';
import * as http from 'http';
import { WebSocketServer } from 'ws';
import { exec, spawn } from 'child_process';
import cors from 'cors';
import { queryOnDatabase, mutiStatementsQuery } from "./services/db.js";
import jwt from 'jsonwebtoken';
import path from 'path';
import authMiddleware from './authentification-middleware.js';
import { mkdirSync, createWriteStream, readFileSync } from 'fs';
import { join, resolve, dirname } from 'path'
const app = express();


app.use(cors());

app.get('/SauvegardeEssai', async (req, res, next) => {
    const PressionIn = "5"
    const PressionOut = "5"
    const PressionMax = "5"
    const rendement = "1"
    const ModeOp = "4"
    const Conformite = "0"
    //const DateEssai = `${new Date().toLocaleDateString().replaceAll('/', '-')}`
    console.log(DateEssai)
    queryOnDatabase(`INSERT INTO donnees(PressionIn, PressionOut, PressionMax, Rendement )VALUES ('${PressionIn}', '${PressionOut}','${PressionMax}','${rendement}')`)
    queryOnDatabase(`INSERT INTO essais (ModeOP, Conformite, DateEssai )VALUES ('${ModeOp}', '${Conformite}')`)
})

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

    const DB_USER = "root"
    const DB_PWD = "root"          // on définie nos variables
    const DB_HOST = "127.0.0.1"
    const dirPath = `./sauvegardes/${new Date().toLocaleDateString().replaceAll('/', '-')}`
    mkdirSync(dirPath)          // On créér un dossier à l'emplacement voulu
    const command = `mysqldump -u ${DB_USER} -p${DB_PWD} testverins -h ${DB_HOST}`
    console.log(command)
    exec(`${command} > ${dirPath}/testverins.sql`, (error, stdout, stderr) => {
        // on créer la sauvegardes testverins.sql dans le dossier créé Précédement
        if (error) {
            next(error)
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }
    })
})

app.use(express.static('./../Application Web'), express.json()); //
//app.use(authMiddleware)

app.get('/affaire/fake', async function (req, res, next) {   // Route de simulation de données concernants les affaires 
    const data = []
    const essai = await queryOnDatabase("SELECT * from essai")  // On reçois tout les donnés d'une Affaires 
    result:
    result()
    res.json({ essai });
})

app.post('/api/newAffaire', async (req, res, next) => {

    try {
        const IdUser = await queryOnDatabase(`SELECT IdUser FROM users WHERE Identifiants = '${req.body.user}';`)
        console.log(req.body.user);

    } catch (error) {
        console.error(error);
    }
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
        let token = jwt.sign({ user: user }, 'secret'); //Délivre un token d'authentification
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
