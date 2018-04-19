<h1>node-server-ar-drone</h1>

A [Node.js Express](http://expressjs.com/) server for the [Parrot AR Drone 2.0](http://ardrone2.parrot.com/). The server uses the [node-ar-drone](https://github.com/felixge/node-ar-drone) and [ardrone-autonomy](https://github.com/eschnou/ardrone-autonomy) libraries to fly the drone with REST calls.

<a href="https://vimeo.com/104703586"><img src="https://raw.githubusercontent.com/sirarsalih/sirarsalih.github.io/master/public/img/rest_drone.PNG"/></a>

<h2>Installation</h2>

```
npm install node-server-ar-drone
```

<h2>Usage</h2>
Once the drone is turned on, it will send out WiFi signals like a router. Connect your device (laptop, desktop /w wireless WiFi transmitter, tablet or smart phone) to the drone via WiFi. Like a router, the drone uses the IP <code>192.168.1.1</code> by default. Once connected, simply:
<br/>
<code>
var NodeServerArDrone = require('node-server-ar-drone');
</code>
<br/>
<code>
var nsArDrone = new NodeServerArDrone();
</code>
<br/>
Start up your browser and go to <code>http://localhost:1337</code>. Control the drone by sending POST requests to your local node server:

<ul>
<li><code>http://localhost:1337/takeoff</code> takes off the drone, starts hovering it for 5 seconds and then lands it.</li>
<li><code>http://localhost:1337/takeoffAndSpin</code> takes off the drone, starts hovering it for 4 seconds, spins it clockwise and then lands it after 1 second.</li>
<li><code>http://localhost:1337/land</code> lands the drone immediately.</li>
</ul>

We can also automate the flight path of the drone, by providing predefined <code>x,y</code> coordinates. You can do this by doing a call to [http://localhost:1337/takeoffAndFly](http://localhost:1337/takeoffAndFly) and then appending the call with the coordinates. Here is an example:

<ul>
<li>
<code>http://localhost:1337/takeoffAndFly?c=8,5&c=4,5</code> takes off the drone, flies it to <code>x,y</code> coordinates <code>[8,5]</code>, <code>[4,5]</code> and then lands it. 
</li>
</ul>

<h2>Other Topics</h2>
* [Using from source code](/docs/using-from-source.md)