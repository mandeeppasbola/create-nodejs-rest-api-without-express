const { postHandler, getHandler, defaultHandler } = require("./controller");

const routes = (request, response) => {
  const reqURL = request.url;
  const reqMethod = request.method;

  switch (reqMethod) {
    case "POST": {
      if (reqURL === "/post-api") {
        postHandler(request, response);
      }
      break;
    }
    case "GET": {
      if (reqURL === "/get-api") {
        getHandler(request, response);
      }
      break;
    }
    default: {
      defaultHandler(request, response);
    }
  }
};

module.exports = { routes };
