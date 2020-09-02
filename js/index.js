// TODO:
// Bug click twice to start
// Hitbox detection
//
//
// Easter Eggs
// Plz, Gloria Gaynor
window.onload = () => {
    document.getElementById('start-button').onclick = () => {
        // document.getElementById("game-board").style.display = "block";
        changeMusic(2)
        gameSetup()
    }
    //

    function gameSetup() {
        //startGame
        // player.y = (floor.height - this.height) / 2 + background.height
        // player.x = (gameScript.canvas.width - this.width) * 0.8);
        player = new Player(0, 230, 0.4, 0.4, '/images/rover.png')
        //rover_tiresmoke.png
        tireSmoke = new Smoke(
            400,
            200,
            0.2,
            0.2,
            '/images/rovertiresmoke1.png',
            0
        )
        sky = new Background(0, 0, 0.5, 0.4, '/images/sky.png', 0)
        clouds = new Background(
            0,
            100,
            0.1,
            0.1,
            '/images/cloudsbn.png',
            3 * gameScript.gameSpeed
        )
        mountainFront = new Background(
            0,
            0,
            1,
            1,
            '/images/bckgndFront.png',
            1.5 * gameScript.gameSpeed
        )
        mountainMid = new Background(
            0,
            0,
            1,
            1,
            '/images/bckgndMid.png',
            0.75 * gameScript.gameSpeed
        )
        mountainBack = new Background(
            0,
            0,
            1,
            1,
            '/images/bckgndBack.png',
            0.3 * gameScript.gameSpeed
        )
        floor = new Background(
            0,
            114,
            0.25,
            0.25,
            '/images/terrain.png',
            5 * gameScript.gameSpeed
        )
        // orangeZone1 = new Storm(51, 120 - 30, 0.5, 0.5, '/images/smlcloud.png')
        // orangeZone2 = new Storm(38, 170 - 30, 0.5, 0.5, '/images/smlcloud.png')
        // orangeZone3 = new Storm(30, 230 - 30, 0.5, 0.5, '/images/smlcloud.png')
        // orangeZone4 = new Storm(38, 290 - 30, 0.5, 0.5, '/images/smlcloud.png')
        // orangeZone5 = new Storm(51, 350 - 30, 0.5, 0.5, '/images/smlcloud.png')
        orangeZone1 = new Storm(50, 75, 0.5, 0.5, '/images/smlcloud.png')
        orangeZone2 = new Storm(50, 122, 0.5, 0.5, '/images/smlcloud.png')
        orangeZone3 = new Storm(50, 169, 0.5, 0.5, '/images/smlcloud.png')
        orangeZone4 = new Storm(50, 216, 0.5, 0.5, '/images/smlcloud.png')
        orangeZone5 = new Storm(50, 263, 0.5, 0.5, '/images/smlcloud.png')
        orangeZone6 = new Storm(50, 310, 0.5, 0.5, '/images/smlcloud.png')
        redZone1 = new Storm(-125, 0, 0.5, 0.5, '/images/bigcloud1.png')
        redZone2 = new Storm(-125, 51.4, 0.5, 0.5, '/images/bigcloud2.png')
        redZone3 = new Storm(-125, 102.8, 0.5, 0.5, '/images/bigcloud1.png')
        redZone4 = new Storm(-125, 153.6, 0.5, 0.5, '/images/bigcloud2.png')
        redZone5 = new Storm(-125, 204.2, 0.5, 0.5, '/images/bigcloud1.png')
        // boulder1 = new Component(500, 170, 0.1, 0.1, '/images/boulder1.png', 5)
        // boulder2 = new Component(500, 280, 0.1, 0.1, '/images/boulder2.png', 5)
        // boulder3 = new Component(400, 230, 0.1, 0.1, '/images/boulder3.png', 5)
        gameScript.start()
        gameScript.yComponentsPos = []
        gameScript.obstaclesArray = []
    }

    function gameLoop() {
        gameScript.clear()
        gameScript.frames += 1
        gameScript.testVar += 1
        if (gameScript.testVar / 60 > 2) {
            gameScript.battery.pop()
            gameScript.testVar = 0
        }
        // if (((gameScript.frames % 180) * gameScript.gameSpeed) / 3 === 0) {
        //     createObstacle()
        // }
        sky.draw()
        mountainBack.scroll()
        mountainMid.scroll()
        mountainFront.scroll()
        floor.scroll()
        clouds.scroll()
        gameScript.obstaclesArray.forEach((obj) => {
            if (obj.x < 0) {
                gameScript.obstaclesArray.shift()
            }
            obj.move()
            gameScript.yComponentsPos.push(obj)
        })
        gameScript.yComponentsPos.push(player)
        gameScript.yComponentsPos.push(tireSmoke)
        gameScript.yComponentsPos.push(orangeZone1)
        gameScript.yComponentsPos.push(orangeZone2)
        gameScript.yComponentsPos.push(orangeZone3)
        gameScript.yComponentsPos.push(orangeZone4)
        gameScript.yComponentsPos.push(orangeZone5)
        gameScript.yComponentsPos.push(orangeZone6)
        gameScript.yComponentsPos.push(redZone1)
        gameScript.yComponentsPos.push(redZone2)
        gameScript.yComponentsPos.push(redZone3)
        gameScript.yComponentsPos.push(redZone4)
        gameScript.yComponentsPos.push(redZone5)
        gameScript.yComponentsPos.sort((a, b) =>
            a.bottom() > b.bottom() ? 1 : -1
        )
        gameScript.yComponentsPos.forEach((obj) => obj.draw())
        player.move()
        tireSmoke.moveSmoke()
        orangeZone1.move()
        orangeZone2.move()
        orangeZone3.move()
        orangeZone4.move()
        orangeZone5.move()
        orangeZone6.move()
        redZone1.move()
        redZone2.move()
        redZone3.move()
        redZone4.move()
        redZone5.move()
        gameScript.score()
        gameScript.reqAnimation = window.requestAnimationFrame(gameLoop)
        gameScript.yComponentsPos = []
    }
    const gameScript = {
        //myGameArea
        canvas: document.createElement('canvas'),
        obstaclesArray: [],
        yComponentsPos: [],
        testVar: 0,
        frames: 0,
        seconds: 0,
        minutes: 0,
        gameSpeed: 1,
        battery: [],
        fontX: 30,
        fontY: 30,
        drawCanvas: function () {
            this.canvas.width = 800 // OR screen.width * 0.7;
            this.canvas.height = 395 // 400 px playable area + ~114 px background
            this.context = this.canvas.getContext('2d')
            document.getElementById('game-board').append(this.canvas)
        },
        start: function () {
            this.drawCanvas()
            let arr = [...new Array(10)].forEach((el) => this.battery.push('|'))
            this.reqAnimation = window.requestAnimationFrame(gameLoop)
        },
        clear: function () {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        },
        score: function () {
            const ctx = this.context
            seconds = Math.floor((this.frames / 60) % 60)
            minutes = Math.floor(this.frames / 3600)
            var gradient = ctx.createLinearGradient(
                this.fontX + 150,
                0,
                this.fontX + 200,
                0
            )
            ctx.font = '24px DOS437'
            // ctx.fillStyle = '#0f6'
            ctx.fillStyle = '#00FF00'
            if (this.frames / 3600 >= 1) {
                ctx.fillText(
                    'Alive for 14 years, 46 days, ' +
                        minutes +
                        ' minutes and ' +
                        seconds +
                        ' seconds',
                    this.fontX,
                    this.fontY
                )
            } else {
                ctx.fillText(
                    'Alive for 14 years, 46 days and ' + seconds + ' seconds',
                    this.fontX,
                    this.fontY
                )
            }
            ctx.fillText('Battery: ', this.fontX, this.fontY + 30)
            gradient.addColorStop('0', 'red')
            gradient.addColorStop('0.15', 'yellow')
            gradient.addColorStop('0.95', 'yellow')
            gradient.addColorStop('1.0', '#00FF00')
            ctx.fillStyle = gradient
            ctx.fillText(
                this.battery.join(''),
                this.fontX + 110,
                this.fontY + 30
            )
        },
        stop: function () {
            clearInterval(this.interval)
            cancelAnimationFrame(this.reqAnimation)
            this.gameOver()

            gameScript.clear()
            this.ctx.fillRect(0, 0, this.width, this.height)
            this.ctx.fillText(`GAME OVER`, this.width / 2, this.height / 2)
        },
        gameOver: function () {
            this.clear()
            this.drawFinalPoints()
            this.restartGame()
        },
        drawFinalPoints: function () {},
        restartGame: function () {},
    }
    function createObstacle() {
        x = gameScript.canvas.width
        y = player.y // rndGen(114, gameScript.canvas.height - 42)
        if (rndGen(1, 4, 'f') == 1) {
            gameScript.obstaclesArray.push(
                new Obstacle(
                    x,
                    y,
                    0.1,
                    0.1,
                    '/images/boulder1.png',
                    5 * gameScript.gameSpeed
                )
            )
        } else if (rndGen(1, 4, 'f') == 1) {
            gameScript.obstaclesArray.push(
                new Obstacle(
                    x,
                    y,
                    0.1,
                    0.1,
                    '/images/boulder2.png',
                    5 * gameScript.gameSpeed
                )
            )
        } else {
            gameScript.obstaclesArray.push(
                new Obstacle(
                    x,
                    y,
                    0.1,
                    0.1,
                    '/images/boulder3.png',
                    5 * gameScript.gameSpeed
                )
            )
        }
    }
    // ================= Background ==================
    function Background(x, y, scaleW, scaleH, image, speed) {
        this.img = new Image()
        this.img.src = image
        this.x = x
        this.y = y
        this.directionX = rndGen(-1)
        this.directionY = rndGen(-1)
        this.targetX = x + 25 * this.directionX
        this.targetY = y + 10 * this.directionY
        this.speed = speed
        this.dx = 0
        this.width = this.img.width * scaleW
        this.height = this.img.height * scaleH
        this.draw = function () {
            const ctx = gameScript.context
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        }
        this.scroll = function () {
            const ctx = gameScript.context
            if (this.dx <= -this.width) {
                this.dx = 0
            }
            this.dx -= this.speed
            ctx.drawImage(
                this.img,
                this.width + this.dx,
                this.y,
                this.width,
                this.height
            )
            ctx.drawImage(this.img, this.dx, this.y, this.width, this.height)
        }
        this.bottom = function () {
            return this.y + this.height
        }
    }
    // =================== Player ====================
    function Player(x, y, scaleW, scaleH, image) {
        this.img = new Image()
        this.img.src = image
        this.reachStart = false
        this.x = x
        this.y = y
        this.stepX = 0.05
        this.stepY = 0.05
        this.targetX = x
        this.targetY = y
        this.width = this.img.width * scaleW
        this.height = this.img.height * scaleH
        this.draw = function () {
            const ctx = gameScript.context
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        }
        this.move = function () {
            // const stepSpeed = 1.75;
            // const checkRate = 0.2;
            // this.targetX = gameScript.canvas.width - this.width - 100
            this.targetX = gameScript.canvas.width - this.width - 300

            // Checks if player is near targe
            if (this.reachStart == false && this.x == gameScript.canvas.width) {
                this.reachStart = true
            }
            if (this.reachStart == false) {
                this.stepX = 0.035
            } else {
                this.stepX = 0.02
            }
            // if (this.x > this.targetX - 25) {
            this.x += (this.targetX - this.x) * this.stepX
            // } else {
            //   this.x += 2.5;
            // }
            this.y += (this.targetY - this.y) * this.stepY
            this.collision()
            this.checkBoundaries()
            this.setScale()
        }
        this.collision = function () {
            gameScript.obstaclesArray.forEach((el) => {
                console.clear()
                // con(player.right)
                // con(el.left)
                con(player.right > el.left)
                con(player.top < el.bottom)
                con(player.bottom > el.top)
                con(
                    player.right > el.left &&
                        (player.top < el.bottom + 5 ||
                            player.bottom > el.top - 5)
                )
                if (
                    player.right > el.left &&
                    (player.top < el.bottom + 5 || player.bottom > el.top - 5)
                ) {
                    con('BOOOM')
                    //
                }
            })
        }

        this.checkBoundaries = function () {
            // Checks and corrects boundaries
            if (this.y < 114) {
                this.y = 114
            }
            if (this.y + this.height > gameScript.canvas.height) {
                this.y = gameScript.canvas.height - this.height
            }

            // Tests if player is near target. If so, target = player position
            // This is done to avoid 499.999999...
            this.targetX - this.x < 1 ? (this.x = this.targetX) : {}
        }
        this.setScale = function () {
            // Y scale width/height change
            const rate = 0.6
            myScale = rate + (1 - rate) * ((this.y - 114) / 246)
            this.width = this.img.width * scaleW * myScale
            this.height = this.img.height * scaleH * myScale
        }
        this.left = function () {
            return this.x
        }
        this.right = function () {
            return this.x + this.width
        }
        this.top = function () {
            return this.y
        }
        this.bottom = function () {
            return this.y + this.height
        }
    }
    function Smoke(x, y, scaleW, scaleH, image) {
        this.img = new Image()
        this.img.src = image
        this.x = x
        this.y = y
        this.width = this.img.width * scaleW
        this.height = this.img.height * scaleH
        this.draw = function () {
            const ctx = gameScript.context
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        }
        this.moveSmoke = function () {
            const rate = 0.6
            this.myScale = rate + (1 - rate) * ((this.y - 114) / 246)
            this.x = player.x - this.width + 10
            this.y = player.y
            this.setScale()
        }
        this.setScale = function () {
            this.width = this.img.width * scaleW * this.myScale
            this.height = this.img.height * scaleH * this.myScale
        }
        this.bottom = function () {
            return this.y + this.height
        }
    }
    // ================== Obstacle ===================
    function Obstacle(x, y, scaleW, scaleH, image, speed) {
        this.img = new Image()
        this.img.src = image
        this.x = x
        this.y = y
        this.speed = speed
        this.dx = 0
        this.width = this.img.width * scaleW
        this.height = this.img.height * scaleH
        this.move = function () {
            this.x -= this.speed

            const rate = 0.6
            this.myScale = rate + (1.2 - rate) * ((this.y - 114) / 246)
            this.setScale()
        }
        this.draw = function () {
            const ctx = gameScript.context
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        }
        this.setScale = function () {
            this.width = this.img.width * scaleW * this.myScale
            this.height = this.img.height * scaleH * this.myScale
        }
        this.left = function () {
            return this.x
        }
        this.right = function () {
            return this.x + this.width
        }
        this.top = function () {
            return this.y
        }
        this.bottom = function () {
            return this.y + this.height
        }
    }
    // ==================== STORM ====================
    function Storm(x, y, scaleW, scaleH, image) {
        this.img = new Image()
        this.img.src = image
        this.x = x
        this.y = y
        this.directionX = rndGen(-1)
        this.directionY = rndGen(-1)
        this.targetX = x + 25 * this.directionX
        this.targetY = y + 10 * this.directionY
        this.speed = rndGen(0.4, 0.5)
        this.width = this.img.width * scaleW
        this.height = this.img.height * scaleH
        this.move = function () {
            Math.abs(this.targetX - this.x) < 1 ? (this.x = this.targetX) : {}
            if (this.x == this.targetX) {
                this.directionX *= -1
                this.targetX += 50 * this.directionX
            }
            this.x += this.speed * this.directionX * gameScript.gameSpeed
            // this.x += (this.targetX - this.x) * 0.025;
            Math.abs(this.targetY - this.y) < 1 ? (this.y = this.targetY) : {}
            if (this.y == this.targetY) {
                this.directionY *= -1
                this.targetY += 5 * this.directionY
            }
            this.y += this.speed * this.directionY * gameScript.gameSpeed
            // this.y += (this.targetY - this.y) * 0.025;
        }
        this.draw = function () {
            const ctx = gameScript.context
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        }
        this.right = function () {
            return this.x + this.width
        }
        this.bottom = function () {
            return this.y + this.height
        }
    }

    //
    document.onkeydown = function (e) {
        const step = 50

        if (e.keyCode == 38) {
            player.targetY = player.y - step
        }

        if (e.keyCode == 40) {
            player.targetY = player.y + step
        }
        // DEBUG ONLY
        if (e.keyCode == 37) {
            // player.x -= 100
            createObstacle()
            // player.targetX = player.x - 100;
        }
        if (e.keyCode == 39) {
            con(gameScript.obstaclesArray)
            // player.targetX = player.x + step;
        }
    }

    function con(consoleMsg) {
        console.log(consoleMsg)
    }

    // if max not defined, returns a -1 OR +1
    // if fn == 'f' (floor) works as expected
    // if fn != 'f', renturns 'not floored'
    function rndGen(min, max, fn) {
        if (max == undefined) {
            return Math.sign(rndGen(0, 2) - 0.5)
        } else if (fn == 'f') {
            return Math.floor(Math.random() * (max - min) + min)
        } else {
            return Math.random() * (max - min) + min
        }
    }

    function changeMusic(number) {
        switch (number) {
            case 1:
                document.getElementById('audio').src =
                    '/audio/David Bowie – Space Oddity.ogg'
                break
            case 2:
                document.getElementById('audio').src =
                    '/audio/Rock Around the Clock-Bill Haley.m4a'
                break
            case 3:
                document.getElementById('audio').src =
                    '/audio/I Will Survive - Gloria Gaynor.mp3'
                break
        }
    }
}

// horizon smoke, small storm, rover smoke
// credit: http://www.chonkypixel.com/
// boulders
// credit: twitter: @Anokolisa
// big storm (altered from)
// credit: twitter: @16pxl
// Font: https://www.dafont.com/perfect-dos-vga-437.font
// Help:
//
// Stack overflow
