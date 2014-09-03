var droneApp = angular.module('droneApp', []);

droneApp.controller('StatusController', ['$scope', '$http', '$timeout', '$rootScope', function ($scope, $http, $timeout, $rootScope) {
    (function tick() {
        $http.get('/status').success(function () {
            $scope.height = data['height'];

            $scope.battery = data['battery'];

            $scope.state = data['state'];

            if (data['lowBattery']) {
                $scope.lowBattery = "LOW BATTERY";
                $scope.lowBatteryClass = "battery-low";
                $rootScope.bodyClass = "battery-low";
            } else {
                $scope.lowBattery = "OK BATTERY";
                $scope.lowBatteryClass = "battery-ok";
                $rootScope.bodyClass = "";
            }

            $timeout(tick, 250);
        }).error(function (data, status, headers, config, statusText) {
            console.log("Error fetching status: " + status + " " + statusText);
            $timeout(tick, 250);
        });
    })();
}]);

droneApp.controller('CommandController', ['$scope', '$http', function ($scope, $http) {
    $scope.sendCommand = function (name) {
        $http({
            method: 'GET',
            url: '/' + name
        }).success(function () {
            $('.status').prepend('<p>OK: ' + name + '</p>');
        }).error(function () {
            $('.status').prepend('<p>Fail: ' + name + '</p>');
        });
    }
}]);

$(document).ready(function () {
    new NodecopterStream(document.getElementById("droneStream"), { port: 13337});
});



