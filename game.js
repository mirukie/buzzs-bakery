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