const postHandler = (request, response) => {
  // custom body-parser for POST request starts
  // http request object is a readable stream,
  // i.e. data arrives in parts/chunks.

  let chunks = [];
  // 'data' event is emitted on every chunk received
  request.on("data", (chunk) => {
    // collecting the chunks in array
    chunks.push(chunk);
  });

  // when all chunks are received, 'end' event is emitted.
  request.on("end", () => {
    // joining all the chunks received
    const data = Buffer.concat(chunks);
    // data.toString() converts Buffer data to querystring format
    // URLSearchParams: takes querystring
    // & returns data in Object format
    const parsedData = new URLSearchParams(data.toString());
    console.log(parsedData);
    // Now request data is accessible using parsedData
    response.end();
  });
  // custom body-parser for POST request ends

  response.writeHead(200, {
    "Content-Type": "application/json",
  });
  response.write(
    JSON.stringify({
      message: "POST Succesfull",
    })
  );
  response.end();
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
