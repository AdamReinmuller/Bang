let restartButt = document.getElementById("restartButt");


restartButt.addEventListener("click", function () {
    location.reload()
});


let cheatCode = document.getElementById("cheatCode");
cheatCode.addEventListener("click", preSetGame);

function preSetGame() {
    let player = new Player('Raj', 1, "Renegade", 1, 1, 4, bang2miss2);
    let enemy1 = new Player('Kristóf', 2, "Bandit", 3, 1, 4, bang2miss2);
    let enemy2 = new Player('Simó', 3, "Sheriff", 0, 1, 4, bang1miss1);
    let enemy3 = new Player('Dombi', 4, "Deputy", 2, 1, 4, bang1miss1);
}
