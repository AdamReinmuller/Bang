let fullDeck = {
    'bang': 8,
    'missed': 8
};

// function dictToArray(dict) {
//     fArray = [];
//     let keys = Object.keys(dict);
//     let values = Object.values(dict);
//     for (let i = 0; i < keys.length; i++) {
//         for (let num = 0; num < values[i]; num++) {
//             fArray.push(keys[i])
//         }
//     }
//     return fArray
// }


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
        } else if (this.role === 'Renegade') {
            return 'static/images/renegade.png'
        } else if (this.role === 'Bandit') {
            return 'static/images/bandit.png'
        } else {
            return 'static/images/deputy.png'
        }
    }

    bang(target) {
        if (this.hand.cards.bang > 0 && this.range >= target.distance) {
            target.hp -= 1;
            this.removeCard('bang');
            // alert(this.name + ' banged ' + target.name + ' successfully')
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


function updateDOM(){

    function getImage(src) {
        return `
    <img src="/${src}" alt="">
    `
    }


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


    //enemy1
    //cardsImage
    document.getElementById('enemy1Hand').innerHTML = `
    ${enemy1.hand.getBackSide().map(getImage).join('')}
    `;
    //HPImage
    document.getElementById('enemy1HP').innerHTML = `
    ${getImage(enemy1.getHpImage())}
    `;
    //roleImage
    if (enemy1.role === 'Sheriff') {
        document.getElementById('enemy1Role').innerHTML = `
        ${getImage(enemy1.roleImage)}
        `
    } else {
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
    ${enemy2.hand.getBackSide().map(getImage).join('')}
    `;
    //HPImage
    document.getElementById('enemy2HP').innerHTML = `
    ${getImage(enemy2.getHpImage())}
    `;
    //roleImage
    if (enemy2.role === 'Sheriff') {
        document.getElementById('enemy2Role').innerHTML = `
        ${getImage(enemy2.roleImage)}
        `
    } else {
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
    ${enemy3.hand.getBackSide().map(getImage).join('')}
    `;
    //HPImage
    document.getElementById('enemy3HP').innerHTML = `
    ${getImage(enemy3.getHpImage())}
    `;
    //roleImage
    if (enemy3.role === 'Sheriff') {
        document.getElementById('enemy3Role').innerHTML = `
        ${getImage(enemy3.roleImage)}
        `
    } else {
        document.getElementById('enemy3Role').innerHTML = `
        ${getImage(enemy3.roleImageBackSide)}
        `
    }
    //names
    document.getElementById('enemy3Name').innerText = `
    ${enemy3.name}
    `;
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

let fullDeck = {
    'bang': 8,
    'missed': 8
};

let bang2miss2 = {'bang': 3, 'missed': 3};
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
                zoomCardToReplace.setAttribute('src', ' ')
                targetZoom.dataset.enableHoover = 'true';

            }
        }
    });

    playerCards.addEventListener('mouseover', function (e) {
            if (targetZoom.dataset.enableHoover === 'true') {
                if (e.target.tagName === 'IMG') {
                    console.log('hoover over event');
                    let handCard = e.target;
                    let handCardSrc = handCard.getAttribute('src');
                    zoomCardToReplace.setAttribute("src", handCardSrc);
                }

            }
        }
    );

    playerCards.addEventListener('mouseout', function (e) {
            if (targetZoom.dataset.enableHoover === 'true') {
                if (e.target.tagName === 'IMG') {
                    console.log('hoover out event');
                    let handCard = e.target;
                    let handCardSrc = handCard.getAttribute('src');
                    zoomCardToReplace.setAttribute("src", ' ');
                }
            }
        }
    );

}

eventListenerVariablesForCardZoom()

updateDOM();
player.bang(enemy1);
updateDOM();
player.bang(enemy1);
updateDOM();