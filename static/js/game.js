function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


class Player { //cards: dictionary
    constructor(name, hp, role, distance, range, features, cards) {
        this.name = name;
        this.role = role;
        this.hp = this.sheriffHp() + hp;
        this.roleImage = this.getRoleImage();
        this.roleImageBackSide = 'static/images/rolebackside.png';
        this.range = range;
        this.features = features;
        this.distance = this.getMustang() + distance;
        this.hand = new Cards(cards);
    }

    getMustang() {
        if (this.features.includes('Mustang')) {
            return 1
        }
        else {return 0}
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
        if (this.hand.cards.bang > 0 && this.range >= target.distance) {
            target.hp -= 1;
            this.removeCard('bang');
            alert(this.name + ' banged ' + target.name + ' successfully')
        }
        else {
            alert('Out of range')
        }
    };

    missed() { //ez nem jo meg
        if (this.hand.missed > 0) {
            this.hp += 1;
            this.removeCard('missed');
        }
    }

    removeCard(card) {
        this.hand.cards[card] -= 1;
    };

    draw2FromDeck() {

    }
}


class Cards {
    constructor(object) {
        this.cards = object;
    }

    getCardsArray() {
        let fArray = [];
        let keys = Object.keys(this.cards);
        let values = Object.values(this.cards);
        for (let i = 0; i < keys.length; i++) {
            for (let num = 0; num < values[i]; num++) {
                fArray.push(keys[i])
            }
        }
        return fArray
    }

    getFrontside() {
        let frontSideArray = [];
        for (let item of this.getCardsArray()) {
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
        for (let i = 0; i < this.getCardsArray().length; i++) {
            backSideArray.push('static/images/cardback.png')
        }
        return backSideArray
    }


}


function enemyUpdate(enemy) {
//enemy2
    //cardsImage
    document.getElementById('enemy'+enemy.id+'Hand').innerHTML = `
    ${enemy.hand.getBackSide().map(getImage).join('')}
    `;
    //HPImage
    document.getElementById('enemy'+enemy.id+'HP').innerHTML = `
    ${getImage(enemy.getHpImage())}
    `;
    //roleImage
    if (enemy.role === 'Sheriff') {
        document.getElementById('enemy'+enemy.id+'Role').innerHTML = `
        ${getImage(enemy.roleImage)}
        `
    } else {
        document.getElementById('enemy'+enemy.id+'Role').innerHTML = `
        ${getImage(enemy.roleImageBackSide)}
        `
    }
    //names
    document.getElementById('enemy'+enemy.id+'Name').innerText = `
    ${enemy.name}
    `;
}

function updateDOM(){

    const getImage = src => `
    <img src="/${src}" alt="">
    `;


    //currentPlayer
    //cardsImage
    document.getElementById('playerHand').innerHTML = `
    ${player.hand.getFrontside().map(getImage).join('')}
    `;
    //HPImage
    document.getElementById('HP').innerHTML = `
    ${getImage(player.getHpImage())}
    `;
    //roleImage
    document.getElementById('role').innerHTML = `
    ${getImage(player.roleImage)}
    `;
    //names
    document.getElementById('playerName').innerText = `
    ${player.name}
    `;


    enemyUpdate(enemy1);
    enemyUpdate(enemy2);
    enemyUpdate(enemy3);

}


function rotatePlayers(){
//switches the players in clockwise fashion and updates their distance
    let temp = player;
    player = enemy3;
    player.distance = 0;
    enemy3 = enemy2;
    enemy3.distance = 1;
    enemy2 = enemy1;
    enemy2.distance = 2;
    enemy1 = temp;
    enemy3.distance = 1;
}


function switchTwoPlayer(enemy) {
    let temp = player;
    player = enemy;


}

function switchBackPlayers() {
    let temp = player;
    player = enemy;
    player.distance = 0;
    enemy = player;

    cheatCode.addEventListener("click", function () {
        player = new Player('Raj', 1, "Renegade", 1, 1, 4, bang2miss2);
        enemy1 = new Player('Kristóf', 2, "Bandit", 3, 1, 4, bang2miss2);
        enemy2 = new Player('Simó', 3, "Sheriff", 0, 1, 4, bang1miss1);
        enemy3 = new Player('Dombi', 4, "Deputy", 2, 1, 4, bang1miss1);
        location.reload();
        player.name = "Lófasz";
    })
}

let fullDeck = {
    'bang': 8,
    'missed': 8
};

function eventListenerVariablesForCardZoom() {

    let playerCards = document.getElementById('playerHand');
    let zoomCardToReplace = document.querySelector('#cardZoom img');
    let targetZoom = document.querySelector('#cardZoom');

    playerCards.addEventListener('click', function (e) {
        if (e.target.tagName === 'IMG') {
            if (targetZoom.dataset.enableHoover === 'true') {
                console.log('click event after if');
                let handCard = e.target;
                let handCardSrc = handCard.getAttribute('src');
                zoomCardToReplace.setAttribute("src", handCardSrc);
                handCard.remove();
                targetZoom.dataset.enableHoover = 'false';


            }
        }
    });

    targetZoom.addEventListener('click', function (e) {
        if (e.target.tagName === 'IMG') {
            if (e.target.getAttribute('src') !== " ") {
                let srcCardGoBackToHand = e.target.getAttribute('src');
                let cardGoBackToHand = document.createElement('img');
                cardGoBackToHand.setAttribute('src', srcCardGoBackToHand);
                playerCards.appendChild(cardGoBackToHand);
                zoomCardToReplace.setAttribute('src', ' ');
                targetZoom.dataset.enableHoover = 'true';

            }
        }
    });


    updateDOM();


    let cards = document.getElementById('playerHand');
    cards.addEventListener('click', function(e){
        if (e.target.tagName === 'IMG' && e.target.getAttribute('src') === '/static/images/bang.png') {
            alert('sessionstorage: bang');
            sessionStorage.setItem('card', 'bang');
        }
    });
    // else if(card.outerHTML === `<img src="/static/images/miss.png" alt="">`) {
    //     card.addEventListener('click', dodgeBang)
    // }

    document.querySelector('#cardZoom img').addEventListener('click', function () {
        alert('sessionstorage: cleared');
        sessionStorage.clear();
    });


    let listener = function () {
        if (sessionStorage.getItem('card') === 'bang'){
            sessionStorage.clear();
            player.bang(e.currentTarget...); // TODO get given enemy
            document.querySelector('#cardZoom img').setAttribute('src', ' ');
            document.querySelector('#cardZoom').dataset.enableHoover = 'true';
            updateDOM();
        }
    };

    document.getElementById('enemy1').addEventListener('click', listener);
    document.getElementById('enemy2').addEventListener('click', listener);
    document.getElementById('enemy3').addEventListener('click', listener);
    document.getElementById('enemy4').addEventListener('click', listener);

    playerCards.addEventListener('mouseover', function (e) {
            if (targetZoom.dataset.enableHoover === 'true') {
                if (e.target.tagName === 'IMG') {
                    console.log('hoover over event');
                    let handCard = e.target;
                    let handCardSrc = handCard.getAttribute('src');
                    zoomCardToReplace.setAttribute("src", handCardSrc)
                }
            }
        }
    );

    playerCards.addEventListener('mouseout', function (e) {
            if (targetZoom.dataset.enableHoover === 'true') {
                if (e.target.tagName === 'IMG') {
                    console.log('hoover out event');
                    zoomCardToReplace.setAttribute("src", ' ');
                }
            }
        }
    );

}

let bang2miss2 = {'bang': 2, 'missed': 2};
let bang1miss1 = {'bang': 1, 'missed': 1};
let players = [];
let player = new Player('Raj',4, "Renegade", 0, 1, [], bang2miss2);
players.push(player);
let enemy1 = new Player('Kristóf',3, "Bandit", 1, 1, [], bang2miss2);
players.push(enemy1);
let enemy2 = new Player('Simó',2, "Sheriff", 2, 1, [], bang1miss1);
players.push(enemy2);
let enemy3 = new Player('Dombi',1, "Deputy", 1, 1, [], bang1miss1);

players.push(enemy3);

eventListenerVariablesForCardZoom();