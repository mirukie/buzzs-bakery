var player;
var toppingPlaceholder = [];
var stepsCycle = ["assets/steps/step1.PNG", "assets/steps/step2.PNG", "assets/steps/step3.PNG", "assets/steps/step4.PNG",
                "assets/steps/step5.PNG", "assets/steps/step6.PNG", "assets/steps/step7.PNG", "assets/steps/step8.PNG", 
                "assets/steps/step9.PNG", "assets/steps/step10.PNG"]

var step = 1;

function startgame() {
    player = new component(100, 220, "assets/steps/step1.PNG", 610, 580, "image");
    gameArea.start();
}

var gameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            gameArea.keys = (gameArea.keys || []);
            gameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            gameArea.keys[e.keyCode] = (e.type == "keydown");
        })
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    }
}

function everyinterval(n) {
    if ((gameArea.frameNo / n) % 1 == 0) { return true; }
    return false;
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = gameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.touchWith = function (otherobj) {
        var left = this.x;
        var right = this.x + (this.width);
        var top = this.y;
        var bottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var touch = true;
        if ((bottom < othertop) ||
            (top > otherbottom) ||
            (right < otherleft) ||
            (left > otherright)) {
            touch = false;
        }
        return touch;
    }
}

function updateGameArea() {
    var x;
    for (i = 0; i < toppingPlaceholder.length; i += 1) {
        if (player.touchWith(toppingPlaceholder[i])) {
            step++;
            toppingPlaceholder.shift();
        }
    }
    if(step > 10) {
        alert("success!");
        return;
    }
    gameArea.clear();
    gameArea.frameNo += 1;
    if (gameArea.frameNo == 1 || everyinterval(250)) {
        x = Math.random() * 1200;
        toppingPlaceholder.push(new component(100, 60, "/assets/toppings/icecream.PNG", x, -150, "image"));
    }
    for (i = 0; i < toppingPlaceholder.length; i += 1) {
        toppingPlaceholder[i].y += 3;
        toppingPlaceholder[i].update();
    }
    player.speedX = 0;
    player.speedY = 0;
    if (gameArea.keys && gameArea.keys[37]) { player.speedX = -6; }
    if (gameArea.keys && gameArea.keys[39]) { player.speedX = 6; }
    player.newPos();
    player.update();
}