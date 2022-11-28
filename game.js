var dragValue;

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

    dragValue.style.left = x + "px";
    dragValue.style.top = y + "px";

}

document.onmouseup = function(e){
    dragValue = null;
}
function startGame() {
    move("thing");
}

