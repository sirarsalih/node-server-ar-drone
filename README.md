node-server-ar-drone
====================

A Node.js <a href="http://expressjs.com/" target="_blank">Express</a> server for the <a href="http://ardrone2.parrot.com/" target="_blank">Parrot AR Drone 2.0</a>. The server uses the <a href="https://github.com/felixge/node-ar-drone" target="_blank">node-ar-drone</a> and <a href="https://github.com/eschnou/ardrone-autonomy" target="_blank">ardrone-autonomy</a> libraries to fly the drone with REST calls.

Getting Started
====================

1. Download and install <a href="http://nodejs.org/download/" target="_blank">Node.js</a>. 
2. Start up command line (cmd) or terminal and execute the following command:
<p><code>npm install -g express</code></p>
This installs the <a href="http://expressjs.com/" target="_blank">Express</a> framework, which is a lightweight version of Node.js.
3. Install the ar-drone library by executing the following command:
<p><code>npm install -g ar-drone</code></p>
This library is used to fly the drone.
4. Install the ardrone-autonomy library by executing the following command:
<p><code>npm install -g ardrone-autonomy</code></p>
This library helps us automate the drone, for instance, enabling us to send predefined flying coordinates.
