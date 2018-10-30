/*
* Create and export configuration variables
*
*/

// Container for all enviroments
var enviroments = {};

// Staging (default) enviroment
enviroments.staging = {
  'httpPort': 8080, // Port 80 for convention
  'envName': 'staging',
};


// Production Object
enviroments.production = {
  'httpPort': 5000,
  'envName': 'production',
};

// Determine wich enviroment was passed as a command-line argument
var currentEnviroment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLocaleLowerCase() : '';

// Chech that the current enviroment is one of the enviroments above, else default
var enviromentToExport = typeof(enviroments[currentEnviroment]) == 'object' ? enviroments[currentEnviroment] : enviroments.staging;

module.exports = enviromentToExport;