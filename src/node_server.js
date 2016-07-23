var express = require('express');
var app = express();
var port = 1337;
var arDrone = require('ar-drone');
var client  = arDrone.createClient();
var autonomy = require('ardrone-autonomy');

var NodeServerArDrone = function() {
  
    app.get('/', function(request, response){
        response.status(200).json({serverup:true});
    });

    app.post('/takeoff', function(request, response){
        console.log("Taking off...");
        client.takeoff();
        client.after(5000, function(){
            console.log("Landing...");
            this.land();
        });
        response.status(200).json({landed:true});
    });
    
    app.post('/takeoffAndSpin', function(request, response){
        console.log("Taking off...");
        client.takeoff();
        client.after(4000, function(){
            console.log("Spinning clockwise...");
            this.clockwise(0.5);
        }).after(1000, function(){
            console.log("Stopping activities and landing...");
            this.stop();
            this.land();
        });
        response.status(200).json({landed:true});
    });
    
    app.post('/takeoffAndFly', function(request, response){
        var coordinates = request.query.c;
        if(coordinates == undefined) return response.status(400).json({landed:false});    
        var controller = new autonomy.Controller(client, {debug: false});
        console.log("Taking off...");
        client.takeoff();
        client.after(8000, function() {
            var xy;
            if (typeof coordinates === 'object') {
                for (var i = 0; i < coordinates.length; i++) {
                    var coordinate = coordinates[i];
                    xy = coordinate.split(",");
                    console.log("Flying to x=" + xy[0] + " " + "y=" + xy[1]);
                    controller.go({x: xy[0], y: xy[1]});
                }
            } else {
                xy = coordinates.split(",");
                console.log("Flying to x=" + xy[0] + " " + "y=" + xy[1]);
                controller.go({x: xy[0], y: xy[1]});
            }
        })
        .after(1000, function(){
            console.log("Landing...");
            this.land();
        });
        response.status(200).json({landed:true});
    });
    
    app.post('/land', function(request, response){
        console.log("Stopping activities and landing...");
        client.stop();
        client.land();
        response.status(200).json({landed:true});
    });
    
    app.listen(port);
    console.log('Node.js express server started on port %s', port);
    
};

module.exports = NodeServerArDrone;


