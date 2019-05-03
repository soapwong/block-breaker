var loadlevel = function(game, n) {
    n = n - 1
    var blocks = []
    var level = levels[n]
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

// TODO，临时放这里
var blocks = []
var enableDebugMode = function(game, enable) {
    if (!enable) {
        return
    }
    // TODO, paused 有 bug, 全局变量放着
    window.paused = !window.paused
    window.addEventListener('keydown', function(event) {
        var k = event.key
        if (k == 'p') {
            // 暂停
            paused = !paused
        } else if ('12345678'.includes(k)) {
            // 临时做的载入关卡
            blocks = loadlevel(game, Number(k))
        }
    })
    // 控制速度
    e('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        window.fps = Number(input.value)
    })
}

var __main = function() {

    var images = {
        ball: 'ball.png',
        block: 'block.png',
        paddle: 'paddle.png',
    }
    var game = SoapGame(30, images, function(g) {
        var paddle = Paddle(game)
        var ball = Ball(game)

        var score = 0

        blocks = loadlevel(game, 1)
        var paused = false

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
            if (window.paused) {
                return
            }
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
                    // log('block 相撞')
                    block.kill()
                    ball.bounce()
                    // 更新分数
                    score += 100
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
            // draw labels
            game.context.fillText('分数: ' + score, 10, 290);

        }
    })

    enableDebugMode(game, true)


}

__main()
