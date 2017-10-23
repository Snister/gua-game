
var log = window.console.log.bind(log);

var loadImage = function(path) {
  var img = new Image();
  img.src = path;
  return img;
}
var aInb = function(x, x1, x2) {
    return x >= x1 && x <= x2
}
// 判断相撞的函数
var checkCollide = function(a, b) {
  if (aInb(a.x, b.x, b.x + b.image.width) || aInb(b.x, a.x, a.x + a.image.width)) {
      if (aInb(a.y, b.y, b.y + b.image.width) || aInb(b.y, a.y, a.y + a.image.width)) {
          return true
      }
  }
  return false
}

// 加载指定关卡 n 表示关卡数
var loadLevels = function(n) {
  n = n -1
  var blocks = []
  var level = levels[n]
  for(var i = 0; i < level.length; i++) {
    var p = level[i]
    var b = Block(p);
    blocks.push(b);
  }
  return blocks;
}
