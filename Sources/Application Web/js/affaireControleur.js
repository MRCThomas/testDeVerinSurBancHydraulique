let addAffaire = document.getElementById("addAffaireButton");
let listeAffaires = document.getElementById("affaires");

function createListeElement(affaires) {
    console.log(affaires)
    let affaireListItem = document.createElement('li');
    affaireListItem.classList.add("menu-deroulant");
    let anchor = document.createElement('a');
    anchor.textContent = `Affaires n° ${affaires.IdAffaire}`
    affaireListItem.appendChild(anchor);
    let unorderedList = document.createElement('ul');
    unorderedList.classList.add('dropdown-content');
    // normalement pour chaque essai de l'affaire .
    essaiListItem = document.createElement('li');
    let anchorEssai = document.createElement('a');
    anchorEssai.textContent = `Essai n° ${affaires.IdEssai}`;
    essaiListItem.appendChild(anchorEssai);
    images = ['./img/blueChart.svg','./img/bluePen.svg','./img/redTrash.svg'];
    images.forEach(src => {
        let img = document.createElement('img');
        img.src=src;
        essaiListItem.appendChild(img);
    })
    unorderedList.appendChild(essaiListItem);
    affaireListItem.appendChild(unorderedList);

    return affaireListItem;
    
}

fetch("http://localhost:3000/api/afficheAffaires", {
    "headers": { "authorization": `Bearer ${localStorage.getItem("Authorization")}` }
})
    .then(response => {
        response.json().then((json) => {
            json.forEach(affaire => {
                listeAffaires.appendChild(createListeElement(affaire))
            });

        })
    })

addAffaire.addEventListener("click", (e) => {

    if (confirm("Etes vous sure de vouloir créer une affaire ?")) {
        const res = fetch("http://localhost:3000/api/newAffaire", {
            "headers": { "authorization": `Bearer ${localStorage.getItem("Authorization")}` }
        });
        console.log(res.json);
    }
})

