$(document).ready(function () {
    new NodecopterStream(document.getElementById("droneStream"), { port: 13337});
    $('.btn').click(function () {
        var action = $(this).data('action');

        $.get('/' + action, function () {
            $('.status').prepend('<p>OK: ' + action + '</p>');
        }).fail(function () {
            $('.status').prepend('<p>Fail: ' + action + '</p>');
        });
    });

    $(window).keypress(function (event) {
        event.preventDefault();

        if (event.which == 32) {
            $.get('/stop', function () {
                console.log("OK");
            }).fail(function () {
                console.log("Error");
            });
        }
    });
});



