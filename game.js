var log = console.log.bind(console)

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

var Paddle = function() {
    var image = imageFromPath('paddle.png')
    var o = {
        image: image,
        x: 100,
        y: 250,
        speed: 8,
    }
    var paddle = o
    o.moveLeft = function() {
        paddle.x -= paddle.speed
    }
    o.moveRight = function() {
        paddle.x += paddle.speed
    }
    o.collide = function(ball) {
        if (ball.y + ball.image.height > o.y) {
            if (ball.x > o.x && ball.x < o.x + o.image.width) {
                // log('bomb')
                return true
            }
        }
        return false
    }
    return o
}

var Ball = function() {
    var image = imageFromPath('ball.png')
    var o = {
        image: image,
        x: 100,
        y: 200,
        speedX: 5,
        speedY: 5,
        fired: false,
    }
    o.fire = function() {
        o.fired = true
    }
    o.move = function() {
        if (o.fired) {
            // log('move')
            if (o.x < 0 || o.x > 400) {
                o.speedX = -o.speedX
            }
            if (o.y < 0 || o.y > 300) {
                o.speedY = -o.speedY
            }
            // move
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    o.bounce = function() {
        o.speedY *= -1
    }
    return o
}

var rectIntersects = function(a, b) {
    var o = a
    if (b.y > o.y && b.y < o.y + o.image.height) {
        if (b.x > o.x && b.x < o.x + o.image.width) {
            return true
        }
    }
    return false
}

var Block = function () {
    var image = imageFromPath('block.png')
    var o = {
        image: image,
        x: 100,
        y: 100,
        w: 50,
        h: 20,
        alive: true,
    }
    o.kill = function() {
        o.alive = false
    }
    o.collide = function(b) {
        return o.alive && (rectIntersects(o, b) || rectIntersects(b, o))
    }
    return o
}

// game
var SoapGame = function() {
    var g = {
        actions: {},
        keydowns: {},
    }
    var canvas = document.querySelector('#id-canvas')
    var context = canvas.getContext('2d')
    g.canvas = canvas
    g.context = context
    // draw
    g.drawImage = function(soapImage) {
        g.context.drawImage(soapImage.image, soapImage.x, soapImage.y)
    }
    //events
    window.addEventListener('keydown', function(event) {
        g.keydowns[event.key] = true
    })
    window.addEventListener('keyup', function(event) {
        g.keydowns[event.key] = false
    })
    // 注册
    g.registerAction = function(key, callback) {
        g.actions[key] = callback
    }
    // timer
    setInterval(function() {
        // evebts
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (g.keydowns[key]) {
                // if keydown, 调用被注册的 action
                g.actions[key]()
            }
        }
        // update
        g.update()
        // clear
        context.clearRect(0, 0, canvas.width, canvas.height)
        // draw
        g.draw()
    }, 1000/60)

    return g
}

var __main = function() {
    var game = SoapGame()

    var paddle = Paddle()
    var ball = Ball()

    var blocks = []
    for (var i = 0; i < 3; i++) {
        var b = Block()
        // 设置 block 坐标
        b.x = i * 150
        b.y = 50
        blocks.push(b)
    }

    // events
    game.registerAction('a', function() {
        paddle.moveLeft()
    })
    game.registerAction('d', function() {
        paddle.moveRight()
    })
    game.registerAction('f', function() {
        ball.fire()
    })

    game.update = function() {
        ball.move()
        // 判断相撞，两个图形相交
        if (paddle.collide(ball)) {
            // 应该调用一个反弹 ball.bounce()
            ball.bounce()
        }
        // 判断 ball 和 block 相撞
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.collide(ball)) {
                log('block 相撞')
                block.kill()
                ball.bounce()
            }
        }
    }

    game.draw = function() {
        // draw
        game.drawImage(paddle)
        game.drawImage(ball)

        // dram blocks
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }

    }
}

__main()
