/**
 * Created by Sirar on 10.08.2014.
 * Modified by Thuc Hoang on 28.08.2014.
 */

var path = require('path');

var express = require('express');

var arDrone = require('ar-drone');
var autonomy = require('ardrone-autonomy');

var bodyParser = require('body-parser');
var _ = require('lodash');

var app = express();
var port = 1337;

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var client = arDrone.createClient();

var stopAndLand = function () {
    console.log("Stop and land");
    this.stop();
    this.land();
};

function renderStatus(response, subtitle) {
    response.render('status', {
        title: 'AR Drone',
        subTitle: subtitle
    });
}

app.get('/', function (request, response) {
    client.disableEmergency();
    renderStatus(response, 'Welcome to my Parrot AR node server!');
});

app.get('/takeoff', function (request, response) {
    console.log("Taking off...");
    client.takeoff();

    client.after(4000, stopAndLand).after(100, function () {
        renderStatus(response, 'Take off - done!');
    });
});

app.get('/takeoffAndSpin', function (request, response) {
    console.log("Taking off...");

    client.takeoff();

    client.after(4000, function () {
        console.log("Spinning clockwise...");
        this.clockwise(3);
    }).after(1000, stopAndLand).after(100, function () {
        renderStatus(response, 'Take off and spin - done!');
    });
});

app.get('/mission', function (request, response) {
    var controller = new autonomy.Controller(client, {debug: false});

    var mission = new autonomy.Mission(client, controller, {});

    mission.takeoff()
        .zero()       // Sets the current state as the reference
        .altitude(1)  // Climb to altitude = 1 meter
        .forward(1)
        .right(1)
        .backward(1)
        .left(1)
        .hover(1000)  // Hover in place for 1 second
        .land();

    mission.run(function (err) {
        if (err) {
            console.log("Oops, something bad happened: %s", err.message);
            mission.client().stop();
            mission.client().land();

            renderStatus(response, 'Mission - failed!');
        } else {
            console.log("Mission success!");

            renderStatus(response, 'Mission - done!');
        }
    });
});

app.get('/land', function (request, response) {
    stopAndLand.bind(client)();

    renderStatus(response, 'Land - done!');
});

app.listen(port, function () {
    console.log('Node.js express server started on port %s', port);
});

