var Ball = function(game) {
    var o = game.imageByName('ball')
    o.x = 150
    o.y = 200
    o.speedX = 10
    o.speedY = 10
    o.fired = false


    o.move = function() {
        if (o.fired) {
            // log('ball move')
            // 01:07:16
            if (o.x < 0 || o.x > 400) {
                o.speedX = -o.speedX
            }
            if (o.y < 0 || o.y > 300) {
                o.speedY = -o.speedY
            }
            // move
            o.x = o.x + o.speedX
            o.y = o.y + o.speedY

        }
    }

    o.fire = function() {
        o.fired = true
    }
    o.bounce = function() {
        o.speedY = -o.speedY
    }
    o.hasPoint = function(x, y) {
        var xIn = x >= o.x && x <= o.x + o.w
        var yIn = y >= o.y && y <= o.y + o.h
        return xIn && yIn
    }
    return o
}
