/**
 * Created by Sirar on 10.08.2014.
 */

var express = require('C:/Program Files/nodejs/node_modules/express');
var app = express();
var port = 1337;
var arDrone = require('C:/Program Files/nodejs/node_modules/ar-drone');
var client  = arDrone.createClient();
var autonomy = require('C:/Program Files/nodejs/node_modules/ardrone-autonomy');

app.get('/', function(request, response){
    response.send('Welcome to my Parrot AR node server!');
});

app.get('/takeoff', function(request, response){
    client.takeoff();
    client.after(5000, function(){
        this.land();
    });
});

app.get('/takeoffAndSpin', function(request, response){
    client.takeoff();
    client.after(4000, function(){
        this.clockwise(0.5);
    });
    client.after(1000, function(){
        this.stop();
        this.land();
    });
});

app.get('/land', function(request, response){
    client.stop();
    client.land();
});

app.listen(port);
console.log('Node express server started on port %s', port);