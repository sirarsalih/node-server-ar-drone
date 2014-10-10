var droneApp = angular.module('droneApp', []);

droneApp.filter('reverse', [function () {
    return function (items) {
        return items.slice().reverse();
    };
}]);

droneApp.directive('controlButton', ['$sce', function ($sce) {
    return {
        templateUrl: 'views/button.html',
        restrict: 'A',
        replace: true,
        scope: {
            name: '@',
            buttonClass: '@',
            commandName: '@',
            sendCommand: '&'
        },
        link: function ($scope, $element, $attrs) {
            $scope.displayName = $sce.trustAsHtml($scope.name)
            $scope.runCommand = function () {
                $scope.sendCommand({
                    cmd: $scope.commandName
                });
            }
        }
    }
}]);

droneApp.factory('CommandRunner', ['$http', function ($http) {
    return {
        runCommand: function (command, callback) {
            $http({
                method: 'GET',
                url: '/' + command
            }).success(function () {
                callback({
                    status: 'OK',
                    command: command
                });
            }).error(function () {
                callback({
                    status: 'Fail',
                    command: command
                });
            });
        }
    }
}]);

droneApp.factory("ResponseList", function () {
    var data = [];

    return {
        addResponse: function (response) {
            this.data.push(response);
        },

        data: data
    };
});

droneApp.factory("Status", ['$http', '$timeout', function ($http, $timeout) {
    var statusData = {
        height: 0,
        battery: 0,
        state: "",
        lowBattery: false
    };

    (function tick() {
        $http.get('/status', { timeout: 200 }).success(function (data) {
            statusData.height = data['height'];
            statusData.battery = data['battery'];
            statusData.state = data['state'];
            statusData.lowBattery = !!data['lowBattery'];

            $timeout(tick, 250);
        }).error(function (data, status, headers, config, statusText) {
            console.log("Error fetching status: " + status + " " + statusText);

            $timeout(tick, 250);
        });
    })();

    return {
        statusData: statusData
    }
}]);

droneApp.controller('StatusController', ['Status', function (Status) {
    var self = this;

    self.statusData = Status.statusData;
}]);

droneApp.controller('CommandController', ['CommandRunner', 'ResponseList', function (CommandRunner, ResponseList) {
    var self = this;

    self.rows = buttons;

    self.sendCommand = function (name) {
        CommandRunner.runCommand(name, function (data) {
            ResponseList.addResponse(data);
        });
    }
}]);

droneApp.controller('ResponseController', ['ResponseList', function (ResponseList) {
    var self = this;

    self.data = ResponseList.data;
}]);

droneApp.controller('VideoController', ['$document', function ($document) {
    $document.ready(function () {
        new NodecopterStream($('#droneStream').get(0), { port: 13337 });
    });
}]);

var buttons = [
    {
        rowClass: 'wide',
        buttons: [
            {
                name: 'Stop',
                buttonClass: 'danger',
                commandName: 'stop'
            }
        ]
    },
    {
        buttons: [
            {
                name: "Take Off",
                buttonClass: "success",
                commandName: "takeoff"
            },
            {
                name: "Land",
                buttonClass: "primary",
                commandName: "land"
            }
        ]
    },
    {
        buttons: [
            {
                name: "&#8613;",
                buttonClass: "default",
                commandName: "up"
            },
            {
                name: "&#8615;",
                buttonClass: "default",
                commandName: "down"
            }
        ]
    },
    {
        buttons: [
            {
                name: "&#8592;",
                buttonClass: "default",
                commandName: "left"
            },
            {
                name: "&#8594;",
                buttonClass: "default",
                commandName: "right"
            }
        ]
    },
    {
        buttons: [
            {
                name: "&#8593;",
                buttonClass: "default",
                commandName: "forward"
            },
            {
                name: "&#8595;",
                buttonClass: "default",
                commandName: "back"
            }
        ]
    },
    {
        buttons: [
            {
                name: "&#8634;",
                buttonClass: "default",
                commandName: "ccw"
            },
            {
                name: "&#8635;",
                buttonClass: "default",
                commandName: "cw"
            }
        ]
    },
    {
        buttons: [
            {
                name: "Flip &#8592;",
                buttonClass: "default",
                commandName: "flipLeft"
            },
            {
                name: "Flip &#8594;",
                buttonClass: "default",
                commandName: "flipRight"
            }
        ]
    },
    {
        buttons: [
            {
                name: "Flip &#8593;",
                buttonClass: "default",
                commandName: "flipAhead"
            },
            {
                name: "Flip &#8595;",
                buttonClass: "default",
                commandName: "flipBehind"
            }
        ]
    },
    {
        rowClass: 'wide',
        buttons: [
            {
                name: 'Reset',
                buttonClass: 'primary',
                commandName: 'reset'
            }
        ]
    },
    {
        rowClass: 'wide',
        buttons: [
            {
                name: 'Stop',
                buttonClass: 'danger',
                commandName: 'stop'
            }
        ]
    }
];
