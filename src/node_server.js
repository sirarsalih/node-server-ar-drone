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
    response.send("Welcome to my Parrot AR node server!");
});

app.get('/takeoff', function(request, response){
    console.log("Taking off...");
    client.takeoff();
    client.after(5000, function(){
        console.log("Landing...");
        this.land();
    });
    response.send("Done!");
});

app.get('/takeoffAndSpin', function(request, response){
    console.log("Taking off...");
    client.takeoff();
    client.after(4000, function(){
        console.log("Spinning clockwise...");
        this.clockwise(0.5);
    });
    client.after(1000, function(){
        console.log("Stopping activites and landing...");
        this.stop();
        this.land();
    });
    response.send("Done!");
});

app.get('/takeoffAndFly', function(request, response){
    var coordinates = request.query.c;
    if(coordinates != undefined) {
        var mission  = autonomy.createMission();
        mission.takeoff();
        for(var i = 0; i < coordinates.length; i++) {
            var coordinate = coordinates[i];
            var xy = coordinate.split(",");
            mission.go({x:xy[0], y:xy[1], z:1.5});
        }
        mission.land();
    }
    mission.run(function (err, result) {
        if (err) {
            console.log("Mission failed! Landing drone...");
            mission.client().stop();
            mission.client().land();
        } else {
            console.log("Mission success!");
        }
    });
    response.send("Done!");
});

app.get('/land', function(request, response){
    console.log("Stopping activites and landing...");
    client.stop();
    client.land();
    response.send("Done!");
});

app.listen(port);
console.log('Node.js express server started on port %s', port);