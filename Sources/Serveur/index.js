// Création d'une instance d'express
const { response } = require('express');
var express = require('express');
var app = express();

app.use(express.static('./../Application Web'), express.json()); //

app.post('/welcome', function (req, res) {
    console.log(req.body);
    res.json({
        "hello": req.body.name
    })
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
// Si la page n'est pas reconnu
app.use(function (req, res, next) {
    res.status(404).send("Désolé cette page n'existe pas, veuillez reformuler votre demande)");
});

// Lance le serveur sur le port 3000
app.listen(3000, function () {
    console.log('example app listening on port 3000.');
});
