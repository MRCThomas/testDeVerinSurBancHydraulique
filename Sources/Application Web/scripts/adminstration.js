let Save = document.getElementById("Save");
let RestaureV = document.getElementById("RestaureV");
let ipAdress = "localhost"; 
let file = document.getElementById("file");

Save.addEventListener("click", (e) => {   
        fetch("http://" + ipAdress + ":3000/sauvegarde", {
            "headers": { "authorization": `Bearer ${localStorage.getItem("Authorization")}` }   
        });
alert("Complited");
})

RestaureV.addEventListener("click", (e) => {   
          fetch("http://" + ipAdress + ":3000/restaurationVierge", {
              "headers": { "authorization": `Bearer ${localStorage.getItem("Authorization")}` }   
          });
  })
