function startGame() {
      myGameArea.start();
    }
    
    var myGameArea = {
      canvas : document.createElement("canvas"),
      start : function() {
        this.canvas.width = 1280;
        this.canvas.height = 720;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      }
    }

var myGamePiece;

function startGame() {
    myGameArea.start();
    myGamePiece = new component(30, 30, "red", 10, 120);
    myGamePiece = function(event) {
        myGamePiece.style.position = 'absolute';
        myGamePiece.zIndex = 1000;
        document.body.append(myGamePiece);
        function moveAt(pageX, pageY) {
            myGamePiece.style.left = pageX - myGamePiece.offsetWidth / 2 + 'px';
            myGamePiece.style.top = pageY - myGamePiece.offsetHeight / 2 + 'px';
            moveAt(event.pageX, event.pageY);
            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }
            document.addEventListener('mousemove', onMouseMove);
            myGamePiece.onmouseup = function() {
                document.removeEventListener('mousemove', onMouseMove);
                myGamePiece.onmouseup = null;
            }
            myGamePiece.ondragstart = function() {
                return false;
            }
        }
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;    
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
}
