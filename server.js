'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Lout = require('lout');
const Vision = require('vision');
const Routes = require('./routes');

const config = {};
const server = new Hapi.Server(config);

const port = 8080;
const host = '0.0.0.0';
server.connection({ port: port, host: host });

const loutRegister = {
    register: Lout,
    options: { endpoint: '/docs' }
};

// Were we included from another file?
const local = !module.parent;

server.register([Vision, Inert, loutRegister], function(err) {

    if (err) {
        console.error('Failed loading plugins');
        process.exit(1);
    }

    server.route(Routes);
    
    // Only start listening for requests if running server locally
    if (local) {
        server.start(function () {
            console.log('Server running at:', server.info.uri);
        });
    }
});

module.exports = server;
