var e = function(selector) {
    var element = document.querySelector(selector)
    if (element === null) {
        var s = `元素没有找到, 选择器 ${selector} 写错了或者没有把 js 放在 </body> 前面`
        alert(s)
    } else {
        return element
    }
}

var log = console.log.bind(console)

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
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
