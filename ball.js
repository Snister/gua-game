
var Ball = function() {
  var o = {
    image: loadImage("ball.png"),
    x: 200,
    y: 100,
    speedX: 10,
    speedY: 10,
    fired: false,
  };
  o.fire = function() {
    o.fired = true;
  }
  o.move = function() {
    if (o.fired) {
      // 边界反弹
      if(o.x < 0 || o.x > 400){
        o.speedX = -o.speedX;
      }
      if(o.y < 0 || o.y > 300){
        o.speedY = -o.speedY;
      }
      o.x += o.speedX;
      o.y += o.speedY;
    }
  }
  o.rebound = function() {
    o.speedY *= -1;
  }
  return o;
}
