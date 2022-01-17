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
    const querystring = data.toString();
    // URLSearchParams: takes querystring
    // & returns a URLSearchParams object instance.
    const parsedData = new URLSearchParams(querystring);
    const dataObj = {};
    // entries() method returns an iterator
    // allowing iteration through all key/value pairs
    for (var pair of parsedData.entries()) {
      dataObj[pair[0]] = pair[1];
    }
    console.log("dataObj: ", dataObj);
    // Now request data is accessible using dataObj
    // sending back "Successfull message"
    response.writeHead(200, {
      "Content-Type": "application/json",
    });
    response.write(
      JSON.stringify({
        message: "POST Successfull",
      })
    );
    response.end();
  });
  // custom body-parser for POST request ends
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
      message: "GET Successfull",
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
