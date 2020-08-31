// TODO:
// Random obstacles
// Moving obstacles
// Points
// Battery
// Organize Red and orange zones component declaration
// Adjust Red and Orange components (add more?)
//
// They see me scrolling, they hating:
// - Mountains
// - Floor
// - CLouds
// - Big Storm
// - Small Storm
// - Sky
//
// Easter Eggs
// Plz, Gloria Gaynor
window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    // document.getElementById("game-board").style.display = "block";
    // sky = new Component(0, 0, 0.5, 0.4, "/images/sky.png", "y");
    // clouds = new Component(0, 100, 0.1, 0.1, "/images/clouds.png", "y");
    // sky.draw();
    // clouds.draw();
    myFunctionP2();
    gameSetup();
  };
  //
  function gameSetup() {
    //startGame
    sky = new repeatComponent(0, 0, 0.5, 0.4, "/images/sky.png", 0);
    clouds = new repeatComponent(0, 100, 0.5, 0.4, "/images/clouds.png", 0);
    mountainFront = new Component(0, 0, 1, 1, "/images/bckgndFront.png", 0);
    mountainMid = new Component(0, 0, 1, 1, "/images/bckgndMid.png", 0);
    mountainBack = new Component(0, 0, 1, 1, "/images/bckgndBack.png", 0);
    redZone1 = new Component(0, 0, 0.5, 0.5, "/images/bigcloud1.png", 0);
    redZone2 = new Component(25, 75, 0.5, 0.5, "/images/bigcloud2.png", 0);
    redZone3 = new Component(0, 150, 0.5, 0.5, "/images/bigcloud1.png", 0);
    redZone4 = new Component(-25, 225, 0.5, 0.5, "/images/bigcloud2.png", 0);
    orangeZone1 = new Component(-125, 100, 0.5, 0.5, "/images/smlcloud.png", 0);
    orangeZone2 = new Component(-100, 167, 0.5, 0.5, "/images/smlcloud.png", 0);
    orangeZone3 = new Component(-75, 234, 0.5, 0.5, "/images/smlcloud.png", 0);
    orangeZone4 = new Component(-100, 301, 0.5, 0.5, "/images/smlcloud.png", 0);
    floor = new Component(0, 114, 0.25, 0.25, "/images/terrain.png");
    // player.y = (floor.height - this.height) / 2 + background.height
    // player.x = (gameScript.canvas.width - this.width) * 0.8);
    player = new Player(0, 230, 0.4, 0.4, "/images/rover.png");
    boulder1 = new Component(500, 170, 0.1, 0.1, "/images/boulder1.png", 0);
    boulder2 = new Component(500, 280, 0.1, 0.1, "/images/boulder2.png", 0);
    boulder3 = new Component(400, 230, 0.1, 0.1, "/images/boulder3.png", 0);
    gameScript.start();
    gameScript.yComponentsPos = [];
    gameScript.obstaclesArray = [];
  }
  //
  const gameScript = {
    //myGameArea
    canvas: document.createElement("canvas"),
    obstaclesArray: [],
    yComponentsPos: [],
    drawCanvas: function () {
      this.canvas.width = 661; // OR screen.width * 0.7;
      this.canvas.height = 395; // 400 px playable area + ~114 px background
      this.context = this.canvas.getContext("2d");
      document.getElementById("game-board").append(this.canvas);
    },
    start: function () {
      this.drawCanvas();
      this.reqAnimation = window.requestAnimationFrame(gameLoop);
    },
    clear: function () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    score: function () {},
    stop: function () {},
    gameOver: function () {},
    drawFinalPoints: function () {},
    restartGame: function () {},
  };

  function gameLoop() {
    //updateGameArea
    gameScript.clear();
    sky.draw();

    mountainBack.draw();
    mountainMid.draw();
    mountainFront.draw();
    floor.draw();
    clouds.draw();

    gameScript.yComponentsPos.push(player);
    gameScript.yComponentsPos.push(boulder1);
    gameScript.yComponentsPos.push(boulder2);
    gameScript.yComponentsPos.push(boulder3);
    gameScript.yComponentsPos.push(orangeZone1);
    gameScript.yComponentsPos.push(orangeZone2);
    gameScript.yComponentsPos.push(orangeZone3);
    gameScript.yComponentsPos.push(orangeZone4);
    gameScript.yComponentsPos.push(redZone1);
    gameScript.yComponentsPos.push(redZone2);
    gameScript.yComponentsPos.push(redZone3);
    gameScript.yComponentsPos.push(redZone4);
    gameScript.yComponentsPos.sort((a, b) =>
      a.bottom() > b.bottom() ? 1 : -1
    );

    gameScript.yComponentsPos.forEach((obj) => obj.draw());
    //------------------------
    player.move();

    gameScript.reqAnimation = window.requestAnimationFrame(gameLoop);
    gameScript.yComponentsPos = [];
  }

  function Component(x, y, scaleW, scaleH, image, step) {
    this.img = new Image();
    this.img.src = image;
    this.x = x;
    this.y = y;
    this.targetX = x;
    this.targetY = y;
    this.step = step;
    this.width = this.img.width * scaleW;
    this.height = this.img.height * scaleH;
    this.draw = function () {
      const ctx = gameScript.context;
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };
    this.move = function () {};
    this.left = function () {
      return this.x;
    };
    this.right = function () {
      return this.x + this.width;
    };
    this.top = function () {
      return this.y;
    };
    this.bottom = function () {
      return this.y + this.height;
    };
    this.move = function () {};
    // Create temporary Canvas to use as an image
    // into the drawImage function.
  }

  function repeatComponent(x, y, scaleW, scaleH, image, step) {
    this.img = new Image();
    this.img.src = image;

    this.x = x;
    this.y = y;
    this.targetX = x;
    this.targetY = y;
    this.step = step;
    this.width = this.img.width * scaleW;
    this.height = this.img.height * scaleH;
    // this.img.onload = function () {
    //   // drawPattern(this, this.x, this.y, scaleH, scaleH);
    // };
    this.draw = function () {
      const ctx = gameScript.context;
      drawPattern(this, this.x, this.y, scaleW, scaleH);
      // ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };
  }
  function drawPattern(imgRepeat, x, y, scaleW, scaleH) {
    //
    // var canvas = document.getElementById("canvas");
    // canvas.width = 661;
    // canvas.height = 395;

    var tempCanvas = document.createElement("canvas"),
      tCtx = tempCanvas.getContext("2d");

    tempCanvas.width = imgRepeat.width * scaleW;
    tempCanvas.height = imgRepeat.height * scaleH;
    tCtx.drawImage(imgRepeat.img, 0, 0, imgRepeat.width, imgRepeat.height);
    // The createPattern repeats the created temporary canvas
    tCtx.globalAlpha = 0.25;
    var ctx = gameScript.canvas.getContext("2d");
    ctx.clearRect(x, y, 661, tempCanvas.height);
    ctx.fillStyle = ctx.createPattern(tempCanvas, "repeat");

    ctx.beginPath();
    ctx.rect(x, y, 661, imgRepeat.height * scaleH);
    // ctx.fillStyle = "transparent";
    ctx.fill();
    // ctx.fillStyle = ctx.createPattern(tempCanvas, "repeat");
    // ctx.beginPath();
    // ctx.fillRect(this.x, this.y, gameScript.canvas.width, this.height);
    // ctx.fill();
  }
  function Player(x, y, scaleW, scaleH, image) {
    this.img = new Image();
    this.img.src = image;
    this.x = x;
    this.y = y;
    this.targetX = x;
    this.targetY = y;
    this.step = 0.05;
    this.width = this.img.width * scaleW;
    this.height = this.img.height * scaleH;
    this.draw = function () {
      const ctx = gameScript.context;
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };
    this.left = function () {
      return this.x;
    };
    this.right = function () {
      return this.x + this.width;
    };
    this.top = function () {
      return this.y;
    };
    this.bottom = function () {
      return this.y + this.height;
    };
    this.move = function () {
      const stepSpeed = 1.75;
      const checkRate = 0.2;

      this.targetX = 500;

      // Y scale width/height change
      const rate = 0.6;
      this.myScale = rate + (1 - rate) * ((this.y - 114) / 246);

      if (
        (this.x <= this.targetX + checkRate * 50 &&
          this.x - this.targetX > 0) ||
        (this.x >= this.targetX - checkRate * 50 && this.x - this.targetX < 0)
      ) {
        this.x += (this.targetX - this.x) * this.step * stepSpeed;
      } else {
        this.x += (this.targetX - this.x) * this.step;
      }
      if (
        (this.y <= this.targetY + checkRate * 50 &&
          this.y - this.targetY > 0) ||
        (this.y >= this.targetY - checkRate * 50 && this.y - this.targetY < 0)
      ) {
        this.y += (this.targetY - this.y) * this.step * stepSpeed;
      } else {
        this.y += (this.targetY - this.y) * this.step;
      }
      // this.x += (this.targetX - this.x) * this.step;
      // this.y += (this.targetY - this.y) * this.step;
      // Checks and corrects boundaries
      if (this.y < 114) {
        this.y = 114;
      }
      if (this.x > 500) {
        this.x = 500;
      }
      if (this.y + this.height > gameScript.canvas.height) {
        this.y = gameScript.canvas.height - this.height;
      }
      this.width = this.img.width * scaleW * this.myScale;
      this.height = this.img.height * scaleH * this.myScale;
    };
  }
  document.onkeydown = function (e) {
    const step = 50;

    if (e.keyCode == 38) {
      player.targetY = player.y - step;
    }

    if (e.keyCode == 40) {
      player.targetY = player.y + step;
    }
    // DEBUG ONLY
    if (e.keyCode == 37) {
      player.x -= 100;
      // player.targetX = player.x - 100;
    }
    // if (e.keyCode == 39) {
    //   player.targetX = player.x + step;
    // }
  };

  function con(consoleMsg) {
    console.log(consoleMsg);
  }
  function myFunctionP1() {
    document.getElementById("audio").src =
      "/audio/David Bowie – Space Oddity.ogg";
  }
  function myFunctionP2() {
    document.getElementById("audio").src =
      "/audio/Rock Around the Clock-Bill Haley.m4a";
  }
  function myFunctionP3() {
    document.getElementById("audio").src =
      "/audio/I Will Survive - Gloria Gaynor.mp3";
  }
};

// back ground smoke, small storm, rover smoke
// credit: http://www.chonkypixel.com/
// boulders
// credit: twitter: @Anokolisa
// big storm (altered from)
// credit: twitter: @16pxl
