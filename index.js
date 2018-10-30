/*
* Primary file for the API
*
*/

// Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');


// Instanciating the HTTP server
var httpServer = http.createServer(function(req, res){
  server(req,res);
});


// Start the HTTP server,
httpServer.listen(config.httpPort, function(){
  console.log("The server is listening on port " + config.httpPort);
});


var server = function(req,res){

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

  // Get the payload, if any
  const decoder = new StringDecoder('utf-8');
  var buffer = '';
  req.on('data', function(data){
    buffer += decoder.write(data);
  });
  req.on('end', function(){
    buffer += decoder.end();

    // Choose the handler this request should go to, if not Found, choose NotFound
    var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound

    // Construct the data object to send to the handler
    var data = {
      'trimmedPath': trimmedPath,
      'queryStringObject': queryStringObject,
      'method': method,
      'headers': headers,
      'payload': buffer,
    };

    // Route the request to the handler specified in the router
    chosenHandler(data, function(statusCode, payload){
      // Use the status code callled back by the handler, or default to 200
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
      // Use the payload called back by the handler or default to an empty object
      payload = typeof(payload) == 'object' ? payload: {};

      // Convert the payload to a string
      var payloadString = JSON.stringify(payload);

      // Return the response
      res.setHeader('Content-Type','application/json');
      res.writeHead(statusCode);
      res.end(payloadString)

      // Log the request path
      console.log('Returning this response: ',statusCode,payloadString);
    })
  })
  
};

// Define th handlers
var handlers = {};

// Hello handler
handlers.hello = function(data,callback){
  const hello = {
    msg: 'Hello Visitor, enjoy the ride',
    post: `You have just posted: ${data.payload}`
  }
  callback(200, hello);
};

// Not Found handler
handlers.notFound = function(data, callback){
  const notFound = {
    msg: "Please enter a valid route, in 'routes' you can find a list of all available routes",
    routes: Object.keys(router)
  }
  callback(404, notFound);

};

// Define a request router
var router = {
  'hello': handlers.hello
}