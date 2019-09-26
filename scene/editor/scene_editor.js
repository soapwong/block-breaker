class SceneEditor extends GuaScene {
    constructor(game) {
        super(game)
        // game.canvas.addEventListener('click', )
        // 边点砖块边打砖块
        this.paddle = Paddle(game)
        this.ball = Ball(game)
        this.blocks = []

        game.registerAction('a', () => {
            this.paddle.moveLeft()
        })
        game.registerAction('d', () => {
            this.paddle.moveRight()
        })
        game.registerAction('f', () => {
            this.ball.fire()
        })

        // 点击渲染
        bindEvent(game.canvas, 'click', (event) => {
            log('click')
            let x = event.offsetX
            let y = event.offsetY
            let p = [x, y]
            let b = Block(game, p)
            this.blocks.push(b)
        })
        log('blocks', this.blocks)

    }
    draw() {
        // scene
        var context = this.game.context
        var game = this.game
        context.fillStyle = '#2c3e50'
        context.fillRect(0, 0, 400, 300)

        game.drawImage(this.paddle)
        game.drawImage(this.ball)
        
        for (let i = 0; i < this.blocks.length; i++) {
            var b = this.blocks[i]
            if (b.alive) {
                game.drawImage(b)
            }
        }
    }
    update() {
        this.ball.move()
        if (this.paddle.collide(this.ball)) {
            this.ball.bounce()
        }

        for (let i = 0; i < this.blocks.length; i++) {
            let block = this.blocks[i]
            if (block.collide(this.ball)) {
                block.kill()
                this.ball.bounce()
            }
        }
    }
}