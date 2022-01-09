const qs = require("querystring");

const postHandler = (request, response) => {
  // custom body-parser starts
  let chunks = [];
  request.on("data", (chunk) => {
    chunks.push(chunk);
  });
  request.on("end", () => {
    const data = Buffer.concat(chunks);
    const parsedData = qs.parse(data.toString());
    console.log(parsedData);
    // Now request data is accessible using parsedData
    // And we can do any operation on the same, like saving it to databse
    // custom body-parser ends

    //return the success response
    response.writeHead(200, {
      "Content-Type": "application/json",
    });
    response.write(
      JSON.stringify({
        message: "POST Succesfull",
      })
    );
    response.end();
  });
};

const getHandler = (request, response) => {
  const data = {
    name: "frontendguruji",
    category: "technology",
    website: "frontendguruji.com",
  };
  response.writeHead(200, {
    "Content-Type": "application/json",
  });
  response.write(
    JSON.stringify({
      message: "GET Succesfull",
      data,
    })
  );
  response.end();
};

const defaultHandler = (request, response) => {
  response.writeHead(200, {
    "Content-Type": "application/json",
  });
  response.write(
    JSON.stringify({
      message: `API not found at ${request.url}`,
    })
  );
  response.end();
};

module.exports = {
  postHandler,
  getHandler,
  defaultHandler,
};
