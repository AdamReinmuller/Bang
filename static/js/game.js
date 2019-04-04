class Player { //cards: dictionary
    constructor(name, hp, role, distance, range, features, cards) {
        this.name = name;
        this.role = role;
        this.hp = this.sheriffHp() + hp;
        this.roleImage = this.getRoleImage();
        this.roleImageBackSide = 'static/images/rolebackside.png';
        this.range = range;
        this.features = features;
        this.distance = distance;
        this.hand = new Cards(cards);
    }

    getDistance() {
        if (this.features.includes('Mustang')) {
            return 1
        } else {
            return 0
        }
    }

    sheriffHp() {
        if (this.role === 'Sheriff') {
            return 1
        } else {
            return 0
        }
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
            alert(this.name + ' banged ' + target.name + ' successfully')
        } else {
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


function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function enemyUpdate(enemy) {

    const getImage = src => `
    <img src="/${src}" alt="">
    `;

    //cardsImage
    document.getElementById('enemy' + enemy.id + 'Hand').innerHTML = `
    ${enemy.hand.getBackSide().map(getImage).join('')}
    `;
    //HPImage
    document.getElementById('enemy' + enemy.id + 'HP').innerHTML = `
    ${getImage(enemy.getHpImage())}
    `;
    //roleImage
    if (enemy.role === 'Sheriff') {
        document.getElementById('enemy' + enemy.id + 'Role').innerHTML = `
        ${getImage(enemy.roleImage)}
        `
    } else {
        document.getElementById('enemy' + enemy.id + 'Role').innerHTML = `
        ${getImage(enemy.roleImageBackSide)}
        `
    }
    //names
    document.getElementById('enemy' + enemy.id + 'Name').innerText = `
    ${enemy.name}
    `;
}


function updateDOM(players) {

    const getImage = src => `
    <img src="/${src}" alt="">
    `;
    let player = players.slot0;
    let enemy1 = players.slot1;
    let enemy2 = players.slot2;
    let enemy3 = players.slot3;

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


function rotatePlayers(players) {
    //switches the players in clockwise fashion and updates their distance
    let temp0 = players.slot0;
    let temp1 = players.slot1;
    let temp2 = players.slot2;
    let temp3 = players.slot3;
    let temp = {'slot0': temp0, 'slot1': temp1, 'slot2': temp2, 'slot3': temp3};
    temp.slot0.distance = temp.slot0.getDistance();
    temp.slot3.distance = 1 + temp.slot1.getDistance();
    temp.slot2.distance = 2 + temp.slot2.getDistance();
    temp.slot3.distance = 1 + temp.slot3.getDistance();
    return temp
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
}


function addEventListeners() {

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


    let cards = document.getElementById('playerHand');
    cards.addEventListener('click', function (e) {
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


    function getPlayerOfId(id) {
        let players = getPlayers();
        return players['slot' + id];
    }


    function bangListener() {
        if (sessionStorage.getItem('card') === 'bang') {
            sessionStorage.clear();
            let player = getPlayers().slot0;
            let target = getPlayerOfId(e.currentTarget.id);
            player.bang(target);
            document.querySelector('#cardZoom img').setAttribute('src', ' ');
            document.querySelector('#cardZoom').dataset.enableHoover = 'true';
            updateDOM();
        }
    }


    for (let i = 1; i <= 3; i++) {
        document.getElementById(`enemy${i}`).addEventListener('click', bangListener);
    }


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


function getPlayers() {
    let bang2miss2 = {'bang': 2, 'missed': 2};
    let bang1miss1 = {'bang': 1, 'missed': 1};
    let player = new Player('Raj', 4, "Renegade", 0, 1, [], bang2miss2);
    let enemy1 = new Player('Kristóf', 3, "Bandit", 1, 1, [], bang2miss2);
    let enemy2 = new Player('Simó', 2, "Sheriff", 2, 1, [], bang1miss1);
    let enemy3 = new Player('Dombi', 1, "Deputy", 1, 1, [], bang1miss1);
    return {'slot0': player, 'slot1': enemy1, 'slot2': enemy2, 'slot3': enemy3};
}


addEventListeners();
let players = getPlayers();
players = rotatePlayers(players);
updateDOM(players);