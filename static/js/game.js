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
    constructor(name, hp, role, position, range, features, cards) {
        this.name = name;
        this.hp = hp;
        this.hpImage = this.getHpImage();
        this.role = role;
        this.roleImage = this.getRoleImage();
        this.roleImageBackSide = 'static/images/rolebackside.png';
        this.range = range;
        this.position = position;
        this.hand = new Cards(cards);
        this.features = features;
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


let bang2miss2 = {'bang': 3, 'missed': 3};
let bang1miss1 = {'bang': 1, 'missed': 1};

let player = new Player('Raj', 4, "Renegade", 2, 1, 4, bang2miss2);
let enemy1 = new Player('Kristóf', 3, "Bandit", 2, [], 4, bang2miss2);
let enemy2 = new Player('Simó', 2, "Sheriff", 2, [], 4, bang1miss1);
let enemy3 = new Player('Dombi', 1, "Deputy", 2, [], 4, bang1miss1);


function updatePlayerStats() {

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
    } else {
        document.getElementById('enemy1Role').innerHTML = `
        ${getImage(enemy1.roleImageBackSide)}
        `
    }


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
    } else {
        document.getElementById('enemy2Role').innerHTML = `
        ${getImage(enemy2.roleImageBackSide)}
        `
    }


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
    } else {
        document.getElementById('enemy3Role').innerHTML = `
        ${getImage(enemy3.roleImageBackSide)}
        `
    }

}

document.addEventListener('DOMContentLoaded', function () {
    let playerCards = document.getElementById('playerHand');
    playerCards.addEventListener('click', function (e) {
        if (e.target.tagName === 'IMG') {

            //e.target.remove();
        }
    })
});


updatePlayerStats();





