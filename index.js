const http = require("node:http");
const PORT = 8000;

//Create the server
const server = http.createServer((req, res) => {
    console.log("Hello project 7th!");
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");


    const data = {
      message: "Hello from index",
      timestamp: new Date().toISOString(),
    };

    const jsonData = JSON.stringify(data);
    res.end(jsonData);
  } else {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    const data = {
      message: "404 not found",
      timestamp: new Date().toISOString(),
    };
    const jsonData = JSON.stringify(data);
    res.end(jsonData);
  }

});

//Start the server
server.listen(PORT, () => {
  console.log(`Server listening port ${PORT}`);
});

server.on("error", (error) => {
    console.error(error);
});