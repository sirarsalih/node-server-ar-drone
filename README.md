node-server-ar-drone
====================

A Node.js <a href="http://expressjs.com/" target="_blank">Express</a> server for the <a href="http://ardrone2.parrot.com/" target="_blank">Parrot AR Drone 2.0</a>. The server uses the <a href="https://github.com/felixge/node-ar-drone" target="_blank">node-ar-drone</a> and <a href="https://github.com/eschnou/ardrone-autonomy" target="_blank">ardrone-autonomy</a> libraries to fly the drone with REST calls.

Getting Started
====================

1. Download and install <a href="http://nodejs.org/download/" target="_blank">Node.js</a>. 
2. Start up cmd or terminal and execute the following command:
<p><code>npm install -g express</code></p>
This installs the <a href="http://expressjs.com/" target="_blank">Express</a> framework, which is a lightweight version of Node.js.
3. Install the ar-drone library by executing the following command:
<p><code>npm install -g ar-drone</code></p>
This library is used to fly the drone.
4. Install the ardrone-autonomy library by executing the following command:
<p><code>npm install -g ardrone-autonomy</code></p>
This library helps us automate the drone, for instance, enabling us to send predefined flying coordinates.

Connecting to the Drone
====================

Once the drone is turned on, it will send out WiFi signals like a router. Connect your device (laptop, desktop /w wireless WiFi transmitter, tablet or smart phone) to the drone via WiFi. Like a router, the drone uses the IP <code>192.168.1.1</code> by default.

Start up cmd or terminal, navigate to <code>repl.js</code> and execute the following command:
<p><code>node repl.js</code></p> 
This establishes a connection to the (default) IP of the drone at <code>192.168.1.1</code>.

Test Flying the Drone
====================

While connected to the drone, in cmd or terminal, execute the following command:
<p><code>takeoff()</code></p>
This takes off the drone, and it will start hovering in the air. Land the drone by executing the following command:
<p><code>land()</code></p>
There are many other commands you can experiment with, more information provided <a href="https://github.com/felixge/node-ar-drone" target="_blank">here</a>.

Flying the Drone with REST
====================

Now that we were able to establish a connection to the drone and test fly it, we are now ready to control it with REST calls using Node.js. Start up cmd or terminal and navigate to <code>node_server.js</code>, then execute the following command:
<p><code>node node_server.js</code></p>
This establishes a connection to the drone and starts up a local express Node.js server at port <code>1337</code>. As you can see in <code>node_server.js</code>, we have defined serveral GET requests. Start up your browser and go to <a href="http://localhost:1337" target="_blank">http://localhost:1337</a>, you should be greeted by the message <code>Welcome to my Parrot AR node server!</code>
