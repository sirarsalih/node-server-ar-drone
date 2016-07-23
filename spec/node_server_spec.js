/* These are very naive unit tests. Need to make them more robust in the future
 * by injecting fake arDrone client and autonomy controller.
 */

var request = require('request');

describe("The Parrot AR Drone node server",function(){
    
    it("should be up and running.", function(done) {
        request("http://localhost:1337/", function(error, response, body){
            expect(response.statusCode).toEqual(200);
            done();
        });
    });
    
    it("should take off drone and land.", function(done) {
        request.post("http://localhost:1337/takeoff", function(error, response, body){
            expect(response.statusCode).toEqual(200);
            done();
        });
    });
    
    it("should take off drone, spin and land.", function(done) {
        request.post("http://localhost:1337/takeoffAndSpin", function(error, response, body){
            expect(response.statusCode).toEqual(200);
            done();
        });
    });
    
    var x1 = 6, y1 = 3;
    var x2 = 2, y2 = 8;
    it("should take off drone, fly to ["+x1+","+y1+"] then to ["+x2+","+y2+"] and land.", function(done) {
        request.post("http://localhost:1337/takeoffAndFly?c="+x1+","+y1+"&c="+x2+","+y2, function(error, response, body){
            expect(response.statusCode).toEqual(200);
            done();
        });
    });
    
    it("should not take off drone and fly if no coordinates are given.", function(done) {
        request.post("http://localhost:1337/takeoffAndFly", function(error, response, body){
            expect(response.statusCode).toEqual(400);
            done();
        });
    });
    
    it("should land drone.", function(done) {
        request.post("http://localhost:1337/land", function(error, response, body){
            expect(response.statusCode).toEqual(200);
            done();
        });
    });
    
});