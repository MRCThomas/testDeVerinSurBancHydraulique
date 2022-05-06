let socket

async function init() {
    socket = new WebSocket("ws://localhost:3000/ws");

    socket.onopen = function (event) {
        socket.send("connexion");
      };
}

async function sendMessage() {

}

async function listenMessage() {

}


init();