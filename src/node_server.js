/**
 * Created by Sirar on 10.08.2014.
 * Modified by Thuc Hoang on 28.08.2014.
 */

var express = require('express');
var app = express();
var port = 1337;
var arDrone = require('ar-drone');

var autonomy = require('ardrone-autonomy');
var droneStream = require('dronestream');
var bodyParser = require('body-parser');
var path = require('path');
var _ = require('lodash');
var server = require("http").createServer(app);
var client = arDrone.createClient();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

var stopAndLand = function() {
    console.log("Stop and land");
    this.stop();
    this.land();
}

app.get('/', function (request, response) {
    response.render('status', {
        title: 'AR Drone',
        subTitle: 'Welcome to my Parrot AR node server!'
    });
});

app.get('/takeoff', function (request, response) {
    console.log("Taking off...");
    client.takeoff();

    client.after(5000, stopAndLand);

    response.render('status', {
        title: 'AR Drone',
        subTitle: 'Take off - done!'
    });
});

app.get('/takeoffAndSpin', function (request, response) {
    console.log("Taking off...");
    client.takeoff();

    client.after(4000, function () {
        console.log("Spinning clockwise...");
        this.clockwise(0.5);
    }).after(1000, stopAndLand);

    response.render('status', {
        title: 'AR Drone',
        subTitle: 'Take off and spin - done!'
    });
});

app.get('/takeoffAndFly', function (request, response) {
    var coordinates = request.query.c;

    if (!(_.isUndefined(coordinates))) {
        var controller = new autonomy.Controller(client, {debug: false});

        console.log("Taking off...");
        client.takeoff();

        client.after(8000, function () {
            var xy;
            if (coordinates.length > 1) {
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
        }).after(1000, stopAndLand);
    }

    response.render('status', {
        title: 'AR Drone',
        subTitle: 'Take off and fly - done!'
    });
});

app.get('/land', function (request, response) {
    stopAndLand.bind(client)();

    response.render('status', {
        title: 'AR Drone',
        subTitle: 'Land - done!'
    });
});

server.listen(port);
console.log('Node.js express server started on port %s', port);
