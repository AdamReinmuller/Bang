let gameLoop = 1;
let safetyCounter = 0;
let enemyIDs = ['enemy1','enemy2','enemy3'];

let players = {};

let fullDeck = {
    'bang': 8,
    'missed': 8
};



function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


class Player { //cards: dictionary
    constructor(name, hp, role, position, range, features, cards) {
        this.name = name;
        this.role = role;
        this.hp = this.sheriffHp() + hp;
        this.hpImage = this.getHpImage();
        this.roleImage = this.getRoleImage();
        this.roleImageBackSide = 'static/images/rolebackside.png';
        this.range = range;
        this.position = position;
        this.hand = new Cards(cards);
        this.features = features;
    }

    sheriffHp() {
        if (this.role === 'Sheriff') {
            return 1
        }
        else {return 0}
    }

    getHpImage() {
        return `static/images/${this.hp}hp.png`
    }

    getRoleImage() {
        if (this.role === 'Sheriff') {
            return `static/images/sheriff.png`
        }
        else if (this.role === 'Renegade') {
            return 'static/images/renegade.png'
        }
        else if (this.role === 'Bandit') {
            return 'static/images/bandit.png'
        }
        else {
            return 'static/images/deputy.png'
        }
    }

    bang(target) {
        if (this.hand.cardsObject.bang > 0) {
            target.hp -= 1;
            this.removeCard('bang');
        }
    };

    missed() { //ez nem jo meg
        if (this.hand.missed > 0) {
            this.hp += 1;
            this.removeCard('missed');
        }
    }

    removeCard(card) {
        this.hand.cardsObject[card] -= 1;
    };

    draw2FromDeck() {

    }
}


class Cards {
    constructor(object) {
        this.cardsObject = object;
        this.cardsArray = this.dictToArray();
        this.frontSide = this.getFrontside(); //gives back an array of the links
        this.backSide = this.getBackSide();
    }

    dictToArray() {
        let fArray = [];
        let keys = Object.keys(this.cardsObject);
        let values = Object.values(this.cardsObject);
        for (let i = 0; i < keys.length; i++) {
            for (let num = 0; num < values[i]; num++) {
                fArray.push(keys[i])
            }
        }
        return fArray
    }

    getFrontside() {
        let frontSideArray = [];
        for (let item of this.cardsArray) {
            if (item === 'bang') {
                frontSideArray.push('static/images/bang.png');
            } else if (item === 'missed') {
                frontSideArray.push('static/images/miss.png');
            }
        }
        return frontSideArray
    }

    getBackSide() {
        let backSideArray = [];
        for (let i = 0; i < this.cardsArray.length; i++) {
            backSideArray.push('static/images/cardback.png')
        }
        return backSideArray
    }


}


function updatePlayerStats(){

    function getImage(src) {
        return `
    <img src="/${src}" alt="">
    `
    }


    //currentPlayer
    //cardsImage
    document.getElementById('playerHand').innerHTML = `
    ${player.hand.frontSide.map(getImage).join('')}
    `;
    //HPImage
    document.getElementById('HP').innerHTML = `
    ${getImage(player.hpImage)}
    `;
    //roleImage
    document.getElementById('role').innerHTML = `
    ${getImage(player.roleImage)}
    `;
    //names
    document.getElementById('playerName').innerText = `
    ${player.name}
    `;


    //enemy1
    //cardsImage
    document.getElementById('enemy1Hand').innerHTML = `
    ${enemy1.hand.backSide.map(getImage).join('')}
    `;
    //HPImage
    document.getElementById('enemy1HP').innerHTML = `
    ${getImage(enemy1.hpImage)}
    `;
    //roleImage
    if (enemy1.role === 'Sheriff') {
        document.getElementById('enemy1Role').innerHTML = `
        ${getImage(enemy1.roleImage)}
        `
    }
    else {
        document.getElementById('enemy1Role').innerHTML = `
        ${getImage(enemy1.roleImageBackSide)}
        `
    }
    //names
    document.getElementById('enemy1Name').innerText = `
    ${enemy1.name}
    `;


    //enemy2
    //cardsImage
    document.getElementById('enemy2Hand').innerHTML = `
    ${enemy2.hand.backSide.map(getImage).join('')}
    `;
    //HPImage
    document.getElementById('enemy2HP').innerHTML = `
    ${getImage(enemy2.hpImage)}
    `;
    //roleImage
    if (enemy2.role === 'Sheriff') {
        document.getElementById('enemy2Role').innerHTML = `
        ${getImage(enemy2.roleImage)}
        `
    }
    else {
        document.getElementById('enemy2Role').innerHTML = `
        ${getImage(enemy2.roleImageBackSide)}
        `
    }
    //names
    document.getElementById('enemy2Name').innerText = `
    ${enemy2.name}
    `;


    //enemy3
    //cardsImage
    document.getElementById('enemy3Hand').innerHTML = `
    ${enemy3.hand.backSide.map(getImage).join('')}
    `;
    //HPImage
    document.getElementById('enemy3HP').innerHTML = `
    ${getImage(enemy3.hpImage)}
    `;
    //roleImage
    if (enemy3.role === 'Sheriff') {
        document.getElementById('enemy3Role').innerHTML = `
        ${getImage(enemy3.roleImage)}
        `
    }
    else {
        document.getElementById('enemy3Role').innerHTML = `
        ${getImage(enemy3.roleImageBackSide)}
        `
    }
    //names
    document.getElementById('enemy3Name').innerText = `
    ${enemy3.name}
    `;
    document.getElementById("action").addEventListener("click",bang);
}


function rotatePlayers(){
//switches the players in clockwise fashion
    let temp = player;
    player = enemy3;
    enemy3 = enemy2;
    enemy2 = enemy1;
    enemy1 = temp;
    updateNames();

}

function updateNames(){
    players["player"] = player;
    players["enemy1"] = enemy1;
    players["enemy2"] = enemy2;
    players["enemy3"] = enemy3;

}

let bang2miss2 = {'bang': 3, 'missed': 3};
let bang1miss1 = {'bang': 1, 'missed': 1};

let player = new Player('Raj',4, "Renegade", 0, 1, 4, bang2miss2);
players['player'] = player;
let enemy1 = new Player('Kristóf',3, "Bandit", 1, 1, 4, bang2miss2);
players['enemy1'] = enemy1;
let enemy2 = new Player('Simó',3, "Sheriff", 2, 1, 4, bang1miss1);
players['enemy2'] = enemy2;
let enemy3 = new Player('Dombi',1, "Deputy", 3, 1, 4, bang1miss1);
players['enemy3'] = enemy3;


updatePlayerStats();

// rotatePlayers();

updatePlayerStats();



function setImgSrc(id, card_img_src) {
    document.getElementById(id).src = card_img_src;
}

function bang() {
    console.log("Hi, you pressed bang!");
    //addingListenersToEnemies();
    rotatePlayers();
    updatePlayerStats();
    addingListenersToEnemies();



}

function addingListenersToEnemies() {
    for(let i = 0; i < 3; i++){
        document.getElementById(enemyIDs[i]).addEventListener("click", function(){ enemyShooter(enemyIDs[i])}); //
    }
}

function enemyShooter(me) {
    console.log("yo. you pressed me: " + players[me].name);


}

function onEnemyClick() {
    safetyCounter = 0;
    while (player != target && safetyCounter < 8){
        rotatePlayers();
        safetyCounter++;
    }


}

