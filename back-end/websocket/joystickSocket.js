const WebSocket = require("ws");
const server = new WebSocket.Server({ port: "8080" });

let joyX = null;
let joyY = null;

function broadcast(data) {
	console.log("Broadcasting data to all clients:", data);

	server.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify(data));
		}
	});
}

server.on("connection", (socket) => {
	console.log("New client connected");

	if (joyX !== null && joyY !== null) {
		socket.send(JSON.stringify({ x: joyX, y: joyY }));
	}

	socket.on("message", (message) => {
		const messageString = message.toString();

		try {
			const data = JSON.parse(messageString);
			console.log("Parsed Data:", data);

			 if (data.user === "controller") {
				joyX = data.x;
				joyY = data.y;

				const position = {
					x: joyX,
					y: joyY,
				};

				broadcast(position);

				socket.send(`Received data successfully: x = ${joyX} | y = ${joyY} `);
			}
			
		} catch (error) {
			console.error("Failed to parse JSON:", error);
			console.log("Raw string was:", messageString);
		}
	});

	socket.on("close", () => {
		console.log("Client has disconnected");
	});

	socket.on("error", (error) => {
		console.log(`An error has occurred: ${error}`);
	});
});
