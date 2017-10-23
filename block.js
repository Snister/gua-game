var Block = function(position) {
  //  position 的格式是 [0,0]
  var p =position;
  var o = {
    image: loadImage("block.png"),
    x: p[0],
    y: p[1],
    speedX: 10,
    speedY: 10,
    alive: true,
    lifes: p[2] || 1
  };
  o.kill = function(){
    o.lifes--;
    if (o.lifes < 1) {
      o.alive = false;
    }
  }
  o.collide = function(ball) {
    return o.alive && (checkCollide(o, ball) || checkCollide(ball, o));
  }
  return o;
}
