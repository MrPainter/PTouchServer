/**
 * Created by Kos on 18.03.16.
 */


var assert = require('assert');

var io = require('socket.io-client');
var socketURL = 'http://localhost:1337';
var options ={
    transports: ['websocket'],
    'force new connection': true
};


describe('The test', function () {
    describe('bla bla', function () {
        it ('more bla bla', function () {
            var client1 = io.connect(socketURL, options);

            //client1.on('connect', function(data) {
                client1.emit('get', {url:'/testApi/testSocket', data: 'test data', headers: 'test headers'} );
            //});

            client1.on('hello', function(data) {
                assert.equal(1,1);
            });
        });
    });
});

