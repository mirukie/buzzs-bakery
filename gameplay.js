function leftArrowPressed() {
    var element = document.getElementById("image1");
    element.style.left = parseInt(element.style.left) - 20 + 'px';
}

function rightArrowPressed() {
    var element = document.getElementById("image1");
    element.style.left = parseInt(element.style.left) + 20 + 'px';
}

function moveSelection(evt) {
    switch (evt.keyCode) {
        case 37:
        leftArrowPressed();
        break;
        case 39:
        rightArrowPressed();
        break;
        }
    };

function docReady() {
    window.addEventListener('keydown', moveSelection);
}
