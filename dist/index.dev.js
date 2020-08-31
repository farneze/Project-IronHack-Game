"use strict";

// 934px x 114px
window.onload = function () {
  document.getElementById("start-button").onclick = function () {
    document.getElementById("game-board").style.display = "block";
    con("click");
    gameSetup();
  }; //


  function gameSetup() {
    //startGame
    gameScript.start();
  } //


  var gameScript = {
    //myGameArea
    canvas: document.createElement("canvas"),
    drawCanvas: function drawCanvas() {
      document.getElementById("game-board").append(this.canvas);
      this.context = this.canvas.getContext("2d");
      this.canvas.width = 800; // OR screen.width * 0.7;

      this.canvas.height = 500; // 400 px playable area + ~114 px background
    },
    start: function start() {
      this.drawCanvas();
      this.reqAnimation = window.requestAnimationFrame(gameLoop);
    },
    score: function score() {},
    stop: function stop() {},
    gameOver: function gameOver() {},
    drawFinalPoints: function drawFinalPoints() {},
    restartGame: function restartGame() {}
  };

  function gameLoop() {
    //updateGameArea
    gameScript.reqAnimation = window.requestAnimationFrame(gameLoop);
  }

  function Component(x, y, width, height, image) {}

  function Background(source) {}

  document.onkeydown = function (e) {
    if (e.keyCode == 37) {}
  };

  function con(consoleMsg) {
    console.log(consoleMsg);
  }
};