'use strict';

/**
 * NPM modules.
 */
require('babel-register');
var Express = require('express');

/**
 * Internal modules
 */
var config = require('../config/server.js').default;

/**
 * Starts the server.
 */
function serve() {
    // Initialize Express.
    var express = Express();

    // Define directory to serve from
    express.use(Express.static(config.public));

    // Start listening.
    var server = express.listen(config.port);

    server.on('error', onError);
    server.on('listening', onListening);    
}

/**
 * Handles Express error event.
 */
function onError(error) {
    console.error(error);
}

/**
 * Handles Express listening event.
 */
function onListening() {
    console.log('Listening on port ' + config.port);
}

export default serve;
