<h2>Getting Started</h2>

1. Download and install <a href="http://nodejs.org/download/" target="_blank">Node.js</a>. 
2. Start up cmd or terminal and execute the following command:
<br/><br/>
<code>npm install</code>
<br/><br/>
This installs the following framework and libraries:

- <a href="http://expressjs.com/" target="_blank">Express</a> framework, which is a lightweight version of Node.js.
- <a href="http://nodemon.io/" target="_blank">nodemon</a>, which monitors changes in the server source code and automatically restarts the server.
- <a href="https://github.com/felixge/node-ar-drone" target="_blank">node-ar-drone</a> library: This library is used to fly the drone.
- <a href="https://github.com/eschnou/ardrone-autonomy" target="_blank">ardrone-autonomy</a> library: This library helps us automate the drone, for instance, enabling us to send predefined flying coordinates.
- <a href="https://github.com/mhevery/jasmine-node" target="_blank">jasmine-node</a> framework, which is used for writing tests.
- <a href="https://github.com/HuzuTech/jasmine-node-karma" target="_blank">jasmine-node-karma</a> framework, which is used for running tests.
- <a href="https://github.com/request/request" target="_blank">request</a> http client, which is used to perform REST requests from the tests. 

<h2>Connecting to the Drone</h2>

Once the drone is turned on, it will send out WiFi signals like a router. Connect your device (laptop, desktop /w wireless WiFi transmitter, tablet or smart phone) to the drone via WiFi. Like a router, the drone uses the IP ```192.168.1.1``` by default.

Start up cmd or terminal, navigate to ```repl.js``` and execute the following command:

```nodemon repl.js```

This establishes a connection to the (default) IP of the drone at ```192.168.1.1```. While connected to the drone, in cmd or terminal, execute the following command:
<br/><br/>
<code>takeoff()</code>
<br/><br/>
This takes off the drone, and it will start hovering in the air. Land the drone by executing the following command:
<br/><br/>
<code>land()</code>
<br/><br/>
There are many other commands you can experiment with, more information provided <a href="https://github.com/felixge/node-ar-drone" target="_blank">here</a>.

<h2>Flying the Drone with REST Calls</h2>

Now that we are able to establish a connection to the drone and test fly it, we are now ready to control it with REST calls using Node.js. Start up cmd or terminal and navigate to ```node_server.js```, then execute the following command:

```nodemon node_server.js```

This establishes a connection to the drone and starts up a local express Node.js server at port ```1337```. As you can see in ```node_server.js```, we have defined a GET and serveral POST requests. Start up your browser and go to <a href="http://localhost:1337" target="_blank">http://localhost:1337</a>.

Try to control the drone by sending POST requests to your local Node.js server:

<ul>
<li><code>http://localhost:1337/takeoff</code> takes off the drone, starts hovering it for 5 seconds and then lands it.</li>
<li><code>http://localhost:1337/takeoffAndSpin</code> takes off the drone, starts hovering it for 4 seconds, spins it clockwise and then lands it after 1 second.</li>
<li><code>http://localhost:1337/land</code> lands the drone immediately.</li>
</ul>

<h3>Automating the Drone Flight Path</h3>

We can also automate the flight path of the drone, by providing predefined <code>x,y</code> coordinates. You can do this by doing a call to [http://localhost:1337/takeoffAndFly](http://localhost:1337/takeoffAndFly) and then appending the call with the coordinates. Here is an example:

<ul>
<li>
<code>http://localhost:1337/takeoffAndFly?c=8,5&c=4,5</code> takes off the drone, flies it to <code>x,y</code> coordinates <code>[8,5]</code>, <code>[4,5]</code> and then lands it. 
</li>
</ul>

<h2>Running the Tests</h2>

Navigate to <code>node_server_spec.js</code>, start up cmd or terminal and execute the following:

<p><code>jasmine-node-karma node_server_spec.js</code></p>
