var dragValue;
var totalPts;

function move(id) {
    var element = document.getElementById("thing");
    element.style.position = "absolute";
    element.onmousedown = function() {
        dragValue = element;
    }
}

document.onmousemove = function(e) {
    var x = e.pageX;
    var y = e.pageY;

    dragValue.style.left = x - thing.offsetWidth / 2 + "px";
    dragValue.style.top = y - thing.offsetHeight / 2 + "px";

}

document.onmouseup = function(e){
    dragValue = null;
}
function startGame() {
    move("thing");
}

