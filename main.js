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

var enableDebugMode = function(game, enable) {
    if (!enable) {
        return
    }
    // TODO, paused 有 bug, 全局变量放着
    window.paused = !window.paused
    window.addEventListener('keydown', function(event) {
        var k = event.key
        if (k === 'p') {
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
        ball: 'img/ball.png',
        block: 'img/block.png',
        paddle: 'img/paddle.png',
    }

    var game = SoapGame(30, images, function(g) {
        var s = Scene(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__main()
