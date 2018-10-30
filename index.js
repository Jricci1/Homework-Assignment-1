/*
* Primary file for the API
*
*/

// Dependencies
const http = require('http');


// Instanciating the HTTP server
var httpServer = http.createServer(function(req, res){
  res.end('Hello World\n')
});


// Start the HTTP server,
httpServer.listen(8080, function(){
  console.log("The server is listening on port 8080");
});


