const http = require("http");
const { routes } = require("./routes");

const server = http.createServer((request, response) => {
  routes(request, response);
});

server.listen(9000, () => {
  console.log("Server is running on Port 9000");
});
