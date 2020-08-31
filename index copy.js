// So executa a callback quando a pagina terminar de carregar
window.onload = function () {
  // Adiciona handler do evento click no botao de Start Game
  document.getElementById("start-button").onclick = function () {
    // Esconder o titulo e o botao de Start Game
    document.getElementById("title").style.display = "none";

    // Exibir a game board
    document.getElementById("game-board").style.display = "block";

    // Iniciar o jogo
    startGame();
  };

  function startGame() {
    // Iniciar o jogo
    myGameArea.start();

    // Carrega imagem de fundo do canvas
    background = new Background("./images/bg.png");

    // Instancia um novo objeto para o jogador
    player = new Component(80, 50, "./images/flappy.png", 100, 110);

    // Inicializar uma array vazia de obstaculos
    myGameArea.myObstacles = [];
  }
  const myGameArea = {
    canvas: document.createElement("canvas"),
    myObstacles: [],
    frames: 0,
    gravity: 0.1,
    drawCanvas: function () {
      // Largura do canvas e 70% da largura da tela
      this.canvas.width = screen.width - screen.width * 0.3;
      this.canvas.height = 500;
      // Extrai o context 2D do canvas
      this.context = this.canvas.getContext("2d");
      // Adicionar o canvas dentro da div de id "game-board"
      document.getElementById("game-board").append(this.canvas);
    },
    start: function () {
      this.drawCanvas();
      // Antes do final de cada repaint, execute a funcao updateGameArea. Isso gera um novo repaint, criando um ciclo infinito
      this.reqAnimation = window.requestAnimationFrame(updateGameArea);
    },
    // Limpa o canvas
    clear: function () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    // A cada 5 frames incremente o valor da pontuacao e atualize o texto com o valor da pontuacao
    score: function () {
      points = Math.floor(this.frames / 5);
      this.context.font = "38px serif";
      this.context.fillStyle = "white";
      this.context.fillText("Score: " + points, 20, 50);
    },
    // Encerre o loop de animacao e chame game over
    stop: function () {
      cancelAnimationFrame(this.reqAnimation);
      this.gameOver();
    },
    // Limpa o canvas, coloca a tela preta escrita Game over e Reinicia o jogo
    gameOver: function () {
      this.clear();
      this.drawFinalPoints();
      this.restartGame();
    },
    drawFinalPoints: function () {
      this.context.fillStyle = "black";
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.font = "38px serif";
      this.context.fillStyle = "red";
      this.context.fillText("Game Over!", 350, 230);
      this.context.fillStyle = "white";
      this.context.fillText("Your final score: " + points, 300, 280);
    },
    // Depois de 1.5seg, esconda o canvas e exiba o titulo e o botao de start game
    restartGame: function () {
      setTimeout(function () {
        document.getElementById("game-board").style.display = "none";
        document.getElementById("title").style.display = "block";
      }, 1500);
    },
  };
  // draw the background infinite image
  function Background(source) {
    this.img = new Image();
    this.img.src = source;
    this.scale = 1.05;
    this.y = 0;
    this.dx = 0.5;
    this.imgW = this.img.width;
    this.imgH = this.img.height;
    this.x = 0;
    this.clearX = 0;
    this.clearY = 0;
    that = this;
    this.img.onload = function () {
      that.imgW = that.img.width * that.scale;
      that.imgH = that.img.height * that.scale;
      // if (that.imgW > myGameArea.canvas.width) {
      //   that.x = myGameArea.canvas.width - that.imgW;
      // }
      // if (that.imgW > myGameArea.canvas.width) {
      //   that.clearX = that.imgW;
      // } else {
      //   that.clearX = myGameArea.canvas.width;
      // }
      // if (that.imgH > myGameArea.canvas.height) {
      //   that.clearY = that.imgH;
      // } else {
      //   that.clearY = myGameArea.canvas.height;
      // }
    };
    // Continuamente reposiciona a imagem de fundo para aumentar seu eixo X, pra dar ilusao de movimento pra direita
    this.draw = function () {
      ctx = myGameArea.context;
      if (that.imgW <= myGameArea.canvas.width) {
        if (that.x > myGameArea.canvas.width) {
          that.x = -that.imgW + that.x;
        }
        if (that.x > 0) {
          ctx.drawImage(
            that.img,
            -that.imgW + that.x,
            that.y,
            that.imgW,
            that.imgH
          );
        }
        if (that.x - that.imgW > 0) {
          ctx.drawImage(
            that.img,
            -that.imgW * 2 + that.x,
            that.y,
            that.imgW,
            that.imgH
          );
        }
      } else {
        if (that.x > myGameArea.canvas.width) {
          that.x = myGameArea.canvas.width - that.imgW;
        }
        if (that.x > myGameArea.canvas.width - that.imgW) {
          ctx.drawImage(
            that.img,
            that.x - that.imgW + 1,
            that.y,
            that.imgW,
            that.imgH
          );
        }
      }
      ctx.drawImage(that.img, that.x, that.y, that.imgW, that.imgH);
      that.x += that.dx;
    };
  }

  // Classe generica para objetos na cena. E usada tanto pro jogador (player) quando pros obstaculos (obstacles)
  function Component(width, height, image, x, y) {
    this.image = new Image();
    this.image.src = image;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.userPull = 0;
    this.update = function () {
      // Redesenha o componente (player ou obstaculo) em cada atualizacao de frame
      myGameArea.context.drawImage(
        this.image,
        this.x,
        this.y,
        this.width,
        this.height
      );
    };

    // Incrementa as coordenadas atuais do componente (player ou obstaculo) baseando-se na velocidade atual
    this.newPos = function () {
      this.x += this.speedX;
      player.speedY = player.speedY + (myGameArea.gravity - player.userPull);
      this.y += player.speedY;
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

    // playerWidht = 50
    // playerHeight = 30

    // x = 50
    // y = 100

    // obstacleWidht = 50
    // obstacleHeight = 120

    // x = 150
    // y = 150

    // console.log(
    //   "INIT player.bottom(130) < obstacle.top(150)",
    //   player.bottom() < obstacle.top(),
    //   player,
    //   obstacle
    // );
    // console.log(
    //   "player.top(100) > obstacle.bottom(270)",
    //   player.top() > obstacle.bottom(),
    //   player,
    //   obstacle
    // );
    // console.log(
    //   "player.top(100) > obstacle.bottom(270)",
    //   player.right() < obstacle.left(),
    //   player,
    //   obstacle
    // );
    // console.log(
    //   "FINAL player.left(50) > obstacle.right(200)",
    //   player.left() > obstacle.right(),
    //   player,
    //   obstacle
    // );

    this.crashWith = function (obstacle) {
      // Verifica se um dos lados do retangulo do objeto jogado "invade" algum dos lados ocupados pelos pixels do objeto obstaculo

      return !(
        player.bottom() < obstacle.top() ||
        player.top() > obstacle.bottom() ||
        player.right() < obstacle.left() ||
        player.left() > obstacle.right()
      );
    };

    // Verifica se o jogador "caiu" pra fora do canvas ou "subiu" acima do limite do topo do canvas
    this.outOfCanvas = function (obstacle) {
      return player.bottom() > myGameArea.canvas.height || player.top() < 0;
    };
  }

  function createObstacle() {
    // Pega a largura do canvas
    x = myGameArea.canvas.width;
    // Pega a altura do canvas
    y = myGameArea.canvas.height;
    // Gera um valor aleatorio de altura pro obstaculo
    height = Math.floor(Math.random() * (200 - 20 + 1) + 20);
    // Gera um valor aleatorio de espacamente entre diferentes obstaculos
    gap = Math.floor(Math.random() * (200 - 100 + 1) + 100);
    // Gera obstaculos partindo do lado de cima do canvas
    myGameArea.myObstacles.push(
      new Component(70, height, "./images/obstacle_top.png", x, 0)
    );
    // Gera obstaculos partindo do lado de baixo do canvas
    myGameArea.myObstacles.push(
      new Component(
        70,
        y - height - gap,
        "./images/obstacle_bottom.png",
        x,
        height + gap
      )
    );
  }
  function updateGameArea() {
    // Itera sobre todos os obstaculos. Pra cada obstaculo, verifica se a posicao do jogador esta sobreposta a posicao deste obstaculo. Caso positivo, finalize o jogo
    for (i = 0; i < myGameArea.myObstacles.length; i++) {
      if (player.crashWith(myGameArea.myObstacles[i])) {
        myGameArea.stop();
        return;
      }
    }

    // A cada 120 frames (aprox. 2.4 segundos) gera um novo obstaculo
    if (myGameArea.frames % 120 === 0) {
      createObstacle();
    }
    // Limpa o canvas
    myGameArea.clear();
    background.draw();

    // Atualiza a posicao no eixo X dos obstaculos pra eles "andarem" pra esquerda
    myGameArea.myObstacles.forEach(function (obstacle) {
      obstacle.x += -3;
      obstacle.update();
    });
    myGameArea.frames += 1;
    player.newPos();
    player.update();
    myGameArea.score();

    // Se o jogador cair no "chao" ou voar pra cima do "teto", game over
    if (player.outOfCanvas()) {
      myGameArea.stop();
      return;
    }

    // Reatribui um novo animation frame a variavel existente
    myGameArea.reqAnimation = window.requestAnimationFrame(updateGameArea);
  }

  // Quando o usuario pressionar espaco, o Flappy para de cair. Se o usuario segurar, ele comeca a subir
  document.onkeydown = function (e) {
    if (e.keyCode == 32) {
      player.userPull = 0.3;
    }
  };

  // Quando o usuario soltar espaco, o Flappy volta a cair
  document.onkeyup = function (e) {
    if (e.keyCode == 32) {
      player.userPull = 0;
    }
  };
};
