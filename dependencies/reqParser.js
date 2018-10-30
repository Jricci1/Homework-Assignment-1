// Dependencies
const url = require('url');

const reqParser = function(req){
  // Get the url and parse it
  // The true statement gives the ability to use the module QueryString to parse the request
  const parsedUrl =  url.parse(req.url, true); 

  // Get the PATH from the url (replace extra slashes '/' with regex for empty string)
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Get the query string as an object
  const queryStringObject = parsedUrl.query;
  
  // Get the HTTP method
  const method = req.method.toLowerCase();

  // Get the headers as an object
  const headers = req.headers;

  var data = {
      'trimmedPath': trimmedPath,
      'queryStringObject': queryStringObject,
      'method': method,
      'headers': headers,
    };

  return data;
}

module.exports = reqParser;