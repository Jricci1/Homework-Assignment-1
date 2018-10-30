/*
* Primary file for the API
*
*/

// Dependencies
const http = require('http');
const config = require('./config');
const server = require('./dependencies/server');


// Instanciating the HTTP server
var httpServer = http.createServer(function(req, res){
  server(req,res);
});


// Start the HTTP server,
httpServer.listen(config.httpPort, function(){
  console.log("The server is listening on port " + config.httpPort);
});
