let restartButt = document.getElementById("restartButt");


restartButt.addEventListener("click", function () {
    location.reload()
});

let lastActions = [];


let playerCards = document.getElementById('playerHand');
let actionList = document.getElementById('actionList');
playerCards.addEventListener('click', function (e) {
    if (e.target.tagName === 'IMG') {
        whatIwant = e.target.getAttribute('src');
        if (whatIwant === '/static/images/miss.png') {
            let newLine = document.createElement("A");
            newLine.setAttribute("class","dropdown-item");

            let newText = document.createTextNode("missed");
            newLine.appendChild(newText);
            actionList.appendChild(newLine);
        }
        if (whatIwant === '/static/images/bang.png') {
            let newLine = document.createElement("A");
            newLine.setAttribute("class","dropdown-item");

            let newText = document.createTextNode("bang");
            newLine.appendChild(newText);
            actionList.appendChild(newLine);
        }
    }
});

actionList();
