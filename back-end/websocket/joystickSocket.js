const WebSocket = require("ws");
const server = new WebSocket.Server({ port: "8080" });

let joyX = 0;
let joyY = 0;

server.on("connection", (socket) => {
	console.log("New client connected");

	socket.on("message", (message) => {
		const messageString = message.toString();

		try {
			const data = JSON.parse(messageString);
			console.log("Parsed Data:", data);

			if (data.user === "player") {
				const position = {
					x: joyX,
					y: joyY,
				};
				socket.send(JSON.stringify(position));
			} else if (data.user === "controller") {
				joyX = data.x;
				joyY = data.y;
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
