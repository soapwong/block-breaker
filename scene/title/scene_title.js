class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('k', function() {
            var s = Scene(game)
            game.replaceScene(s)
        })
        game.registerAction('e', function() {
            var s = SceneEditor.new(game)
            game.replaceScene(s)
        })
    }
    draw() {
        this.game.context.fillText('按 k 开始游戏', 100, 190)
        this.game.context.fillText('按 e 进入关卡编辑器', 100, 210)
    }
    update() {

    }
}