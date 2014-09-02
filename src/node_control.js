/**
 * Created by Sirar on 10.08.2014.
 * Modified by Thuc Hoang on 28.08.2014.
 */

var express = require('express');
var app = express();
var port = 1337;
var arDrone = require('ar-drone');

var droneStream = require('dronestream');

var path = require('path');

var server = require("http").createServer(app);
var client = arDrone.createClient();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, '../public')));

droneStream.listen(13337, {tcpVideoStream: client.getVideoStream()});

client.config('general:navdata_demo', 'TRUE');

var statusData = {
    'height': client._lastAltitude,
    'battery': client._lastBattery,
    'state': client._lastState,
    'lowBattery': false
};

client.on('altitudeChange', function(alt) {
    statusData['height'] = alt;
});

client.on('batteryChange', function(batt) {
    statusData['battery'] = batt;
});

client.on('lowBattery', function(batt) {
    statusData['battery'] = batt;
    statusData['lowBattery'] = true;
});

app.get('/', function (request, response) {
    response.render('control', {
        title: 'AR Drone'
    });
});

app.get('/takeoff', function (request, response) {
    client.disableEmergency();
    client.takeoff();
    response.status(200).end();
});

app.get('/land', function (request, response) {
    client.stop();
    client.land();
    response.status(200).end();
});

app.get('/flipLeft', function (request, response) {
    client.animate('flipLeft', 1000);
    response.status(200).end();
});

app.get('/flipRight', function (request, response) {
    client.animate('flipRight', 1000);
    response.status(200).end();
});

app.get('/flipAhead', function (request, response) {
    client.animate('flipAhead', 1000);
    response.status(200).end();
});

app.get('/flipBehind', function (request, response) {
    client.animate('flipBehind', 1000);
    response.status(200).end();
});

app.get('/up', function (request, response) {
    client.up(0.5);
    response.status(200).end();
});

app.get('/down', function (request, response) {
    client.down(0.5);
    response.status(200).end();
});

app.get('/left', function (request, response) {
    client.left(0.1);
    response.status(200).end();
});

app.get('/right', function (request, response) {
    client.right(0.1);
    response.status(200).end();
});

app.get('/forward', function (request, response) {
    client.front(0.1);
    response.status(200).end();
});

app.get('/back', function (request, response) {
    client.back(0.1);
    response.status(200).end();
});

app.get('/cw', function (request, response) {
    client.clockwise(0.5);
    response.status(200).end();
});

app.get('/ccw', function (request, response) {
    client.counterClockwise(0.5);
    response.status(200).end();
});

app.get('/stop', function (request, response) {
    client.stop();
    response.status(200).end();
});

app.get('/dance', function (request, response) {
    client.animate('doublePhiThetaMixed', 1000);
    response.status(200).end();
});

app.get('/reset', function (request, response) {
    client.disableEmergency();
    response.status(200).end();
});

app.get('/status', function (request, response) {
    statusData['state'] = client._lastState;

    response.json(statusData);
});

server.listen(port);
console.log('Node.js express server started on port %s', port);
