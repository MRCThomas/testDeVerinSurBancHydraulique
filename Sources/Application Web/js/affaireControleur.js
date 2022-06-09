let addAffaire = document.getElementById("addAffaireButton");
let listeAffaires = document.getElementById("affaires");
let logOffButton = document.getElementById("logOffIcon");
let tableAffaires = [];                                          // Variable contenat la table Affaire de la BDD
let tableEssais = [];                                            // Variable contenant la table Essais de la BDD
let ipAdress = "localhost";                            // Ip du poste sur lequel le code est executer

function createListeAffaire(affaire) {         // Fonction qui instancie une affaire contenant ses essais sur l'interface

    let affaireListItem = document.createElement('li');
    affaireListItem.classList.add("menu-deroulant");

    let anchor = document.createElement('a');
    anchor.textContent = `Affaires n° ${affaire.IdAffaire} - Client : ${affaire.Entreprise}`;
    affaireListItem.appendChild(anchor);


    affaireListItem.addEventListener('click', async (ev) => {
        if (affaireListItem.children[1]) {
            affaireListItem.removeChild(affaireListItem.getElementsByTagName('ul')[0]);
        } else {
            const essais = await (await fetch("http://" + ipAdress + ":3000/api/getTableEssais/" + affaire.IdAffaire,
                {
                    "headers": {
                        "authorization": `Bearer ${localStorage.getItem("Authorization")}`
                    }

                })).json()

            let unorderedList = document.createElement('ul');
            unorderedList.classList.add('dropdown-content');
            affaireListItem.appendChild(unorderedList);

            essais.forEach(essai => {      //On boucle sur tout les essais
                //Si l'id de l'essai correspond a l'id de l'essai contenu dans l'affaire

                let essaiListItem = document.createElement('li');
                let anchorEssai = document.createElement('a');
                anchorEssai.textContent = `Essai n° ${essai.IdEssai}`;
                essaiListItem.appendChild(anchorEssai);

                images = ['./img/blueChart.svg', './img/bluePen.svg', './img/redTrash.svg'];
                images.forEach(src => {
                    let img = document.createElement('img');
                    img.src = src;
                    img.classList.add('modifIcons');
                    essaiListItem.appendChild(img);
                })

                unorderedList.appendChild(essaiListItem);

            })
        }
    })
    listeAffaires.appendChild(affaireListItem);
}

fetch("http://" + ipAdress + ":3000/api/getTableAffaires", {

    "headers": { "authorization": `Bearer ${localStorage.getItem("Authorization")}` }

})
    .then(response => {
        if(response.status === 403 || response.status === 401 || response.status === 500) {
            window.location.href = "http://" + ipAdress + ":3000/";
        }
        response.json().then((json) => {

            tableAffaires = json;
            console.log(tableAffaires);
            tableAffaires.forEach(affaire => {

                let displayedEssai = createListeAffaire(affaire);

            })
        });
    })

addAffaire.addEventListener("click", (e) => {

    if (confirm("Etes vous sure de vouloir créer une affaire ?")) {
        const clientName = prompt("Entrez le nom de votre entreprise :");
        fetch("http://" + ipAdress + ":3000/api/newAffaire", {
            method: 'POST',
            headers: {
                "authorization": `Bearer ${localStorage.getItem("Authorization")}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                "Entreprise": clientName,
            })
        })
            .then(response => {
                if(response.status == 200){
                    alert("l'Affaire à bien été créer.");
                    location.reload();
                }else{
                    response.json().then((json) => {
                        console.log(json.error);
                    });
                }
            })

    }
})

logOffButton.addEventListener("click", (e) => {

    if (confirm("Etes vous sure de vouloir vous déconnecter ?")) {
        localStorage.clear();
        window.location.href = 'http://' + ipAdress + ':3000';
    }
})

