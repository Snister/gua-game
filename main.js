var enableDebugMode = function(ball,enable) {
  if (!enable) {
    return
  }
  var real_fps = document.querySelector("#id_real_fps");
  window.paused = false;
  window.enableGragging = false;
  window.addEventListener("keydown", function(e) {
    var k = e.key;
    if (k == "p") {
      // 暂停游戏
      window.paused = !window.paused;
    }
    if ("1234".includes(k)) {
      // 为了 debug 添加的，切换游戏关卡功能
      blocks = loadLevels(k)
    }
  });

  document.querySelector("#id_fps").addEventListener("input", function(e) {
    var input = e.target;
    real_fps.innerText = window.fps = Number(input.value);
  });

  var clickBall = function(ball, position) {
    return (ball.x <= position[0] && position[0] <= ball.x + ball.image.width) && (ball.y <= position[1] && position[1] <= ball.y + ball.image.height);
  }
  // 拖动功能添加
  window.addEventListener("mousedown",function(e) {
    var p = [e.offsetX, e.offsetY];
    if (clickBall(ball,p)) {
      enableGragging = true;
    }
  })

  window.addEventListener("mousemove",function(e) {
    var p = [e.offsetX, e.offsetY];
    if (enableGragging) {
      ball.x = p[0];
      ball.y = p[1];
    }
  })

  window.addEventListener("mouseup",function(e) {
    enableGragging = false;

  })

}
var score = 0;
var _main = function() {

  var game = Game();
  var paddle = Paddle();
  var ball = Ball();
  blocks = loadLevels(1);

  enableDebugMode(ball,true);

  game.registerAction("a", function() {
    paddle.moveLeft();
  })
  game.registerAction("d", function() {
    paddle.moveRight();
  })
  game.registerAction("f", function() {
    ball.fire();
  })


  game.update = function() {
    if (window.paused) {
      return;
    }
    ball.move();
    // 判断挡板和球碰撞
    if (paddle.collide(ball)) {
      ball.rebound();
    }
    // 判断砖块和球的碰撞
    for (var i = blocks.length - 1; i >= 0; i--) {
      if (blocks[i].collide(ball)) {
        blocks[i].kill();
        score += 10;
        ball.rebound();
      }
    }

  }
  game.draw = function() {
    game.drawImage(paddle);
    game.drawImage(ball);
    for (var i = blocks.length - 1; i >= 0; i--) {
      if (blocks[i].alive) {
        game.drawImage(blocks[i]);
      }
    }
    game.ctx.fillText('分数' + score, 10, 290);
  }

  game.runloop();

}

_main();
