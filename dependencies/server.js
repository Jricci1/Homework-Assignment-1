// Dependencies
const StringDecoder = require('string_decoder').StringDecoder;
const { handlers, router } = require('./handlers');
const urlParser = require('./reqParser');


var server = function(req,res){

  // Get the request and parse it obtaining an object like this:
  // {
  //   'trimmedPath': trimmedPath,
  //   'queryStringObject': queryStringObject,
  //   'method': method,
  //   'headers': headers,
  // };
  var data = urlParser(req);
  // ES6 destructuring
  const { trimmedPath } = data;

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

    // Add the payload to the data object to send to the handler
    data.payload = buffer;

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


module.exports = server;