var Game = function() {
  var g = {
    actions: {},
    keydowns: {},
  };
  var canvas = document.querySelector("#id_table");
  var ctx = canvas.getContext("2d");
  // 定义控制帧率的全局变量
  window.fps = 30;

  g.canvas = canvas;
  g.ctx = ctx;

  // draw
  g.drawImage = function(img) {
    g.ctx.drawImage(img.image, img.x, img.y);
  }

  // events
  window.addEventListener("keydown", function(e){
    g.keydowns[e.key] = true;
  });
  window.addEventListener("keyup", function(e){
    g.keydowns[e.key] = false;
  });

  // register
  g.registerAction = function(key, callback) {
    g.actions[key] = callback;
  }
  g.runloop = function() {
    // check events,  update
    var actions = Object.keys(g.actions)
    for(var i = 0; i < actions.length; i ++) {
      var key = actions[i];
      // 当对应的按键按下时，执行对应的 callback
      if(g.keydowns[key]) {
        g.actions[key]();
      }
    }
    g.update();
    // clear
    g.ctx.clearRect(0, 0, g.canvas.width, g.canvas.height);
    // draw
    g.draw();
    // timer
    setTimeout(function(){
      g.runloop();
    },1000/fps);
  }

  return g;
}
