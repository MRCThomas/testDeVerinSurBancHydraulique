let addAffaire = document.getElementById("addAffaireButton");
let listeAffaires = document.getElementById("affaires");
let logOffButton = document.getElementById("logOffIcon");
let tableAffaires;                                          // Variable contenat la table Affaire de la BDD
let tableEssais;                                            // Variable contenant la table Essais de la BDD
let ipAdress = "localhost";                            // Ip du poste sur lequel le code est executer

function createEssaiElement(essai) {

    let dropdownContent = document.createElement('ul');
    dropdownContent.classList.add('dropdown-content');

    let essaiListItem = document.createElement('li');
    let anchorEssai = document.createElement('a');
    anchorEssai.textContent = `Essai n° ${essai.IdEssai}`;
    essaiListItem.appendChild(anchorEssai);

    images = ['./img/blueChart.svg','./img/bluePen.svg','./img/redTrash.svg'];
    images.forEach(src => {

        let img = document.createElement('img');
        img.src=src;
        img.classList.add('modifIcons');
        essaiListItem.appendChild(img);

    })
    dropdownContent.appendChild(essaiListItem);
    return dropdownContent
}

function createAffaireElement(affaire) {
    let affaireContent = document.createElement('li');
    affaireContent.classList.add("menu-deroulant");

    let anchor = document.createElement('a');
    anchor.textContent = `Affaires n° ${affaire.IdAffaire}`;
    affaireContent.appendChild(anchor);

    return affaireContent
}

function createListeElement(affaire, tableEssais) {         // Fonction qui instancie une affaire contenant ses essais sur l'interface

    let affaireListItem = document.createElement('li');
    affaireListItem.classList.add("menu-deroulant");

    let anchor = document.createElement('a');
    anchor.textContent = `Affaires n° ${affaire.IdAffaire}`;
    affaireListItem.appendChild(anchor);

    

    tableEssais.forEach(essai => {      //On boucle sur tout les essais

        if(essai.IdAffaire == affaire.IdAffaire){       //Si l'id de l'essai correspond a l'id de l'essai contenu dans l'affaire

            let essaiListItem = document.createElement('li');
            let anchorEssai = document.createElement('a');
            anchorEssai.textContent = `Essai n° ${essai.IdEssai}`;
            essaiListItem.appendChild(anchorEssai);

            images = ['./img/blueChart.svg','./img/bluePen.svg','./img/redTrash.svg'];
            images.forEach(src => {

                let img = document.createElement('img');
                img.src=src;
                img.classList.add('modifIcons');
                essaiListItem.appendChild(img);

            })

            unorderedList.appendChild(essaiListItem);
            affaireListItem.appendChild(unorderedList);

            return affaireListItem;
        }
    });
}

fetch("http://" + ipAdress + ":3000/API/getTableEssais", {

    "headers": { "authorization": `Bearer ${localStorage.getItem("Authorization")}` }

})
    .then(response => {

        response.json().then((json) => {

            tableEssais = json;
        })
    })

fetch("http://" + ipAdress + ":3000/api/getTableAffaires", {

    "headers": { "authorization": `Bearer ${localStorage.getItem("Authorization")}` }

})
    .then(response => {
        response.json().then((json) => {

            tableAffaires = json;
            let essaisOk = null;
            console.log(tableAffaires);
            
            tableAffaires.forEach(affaire => {
                console.log(tableEssais);
                tableEssais.forEach(essai => {
                    
                    if(affaire.IdAffaire == essai.IdAffaire){
                        
                        essaisOk.push(createEssaiElement(essai));
                        
                    }
                })

                let displayedAffaire = createAffaireElement(affaire)

                essaisOk.forEach(essai => {

                    displayedAffaire.appendChild(essai);
                })
                listeAffaires.appendChild(displayedAffaire);
            });
        })
    })

addAffaire.addEventListener("click", (e) => {

    if (confirm("Etes vous sure de vouloir créer une affaire ?")) {

        fetch("http://" + ipAdress + ":3000/api/newAffaire", {
            method : 'POST',
            headers: { "authorization": `Bearer ${localStorage.getItem("Authorization")}` },
            body : JSON.stringify({
                "user" : localStorage.getItem("username")
            })
        });
        
    }
})

logOffButton.addEventListener("click", (e) => {

    if(confirm("Etes vous sure de vouloir vous déconnecter ?")) {

        window.location.href = 'http://' + ipAdress + ':3000';
    }
})

