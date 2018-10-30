// Define th handlers
var handlers = {};

// Hello handler
handlers.hello = function(data,callback){
  var post;
  if ( data.payload == ''){
    post = "You haven't POST anything"
  }else {
    post =`You have just posted: ${data.payload}`
  };
  const hello = {
    msg: 'Hello Visitor, enjoy the ride',
    post 
  };
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

module.exports = {
  handlers,
  router
};