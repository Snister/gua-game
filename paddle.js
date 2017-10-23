var Paddle = function() {
  var o = {
    image: loadImage("paddle.png"),
    x: 200,
    y: 250,
    speed: 15,
  };
  o.move = function(x) {
    if (x < 0) {
      x = 0;
    }
    if (x > 400 - o.image.width) {
      x = 400 - o.image.width;
    }
    return x;
  }
  o.moveRight = function() {
    o.x = o.move(o.x + o.speed);
    }
  o.moveLeft = function() {
    o.x = o.move(o.x - o.speed);
  }
  o.collide = function(ball) {
    return checkCollide(o, ball) || checkCollide(ball, o);
  }
  return o;
}
