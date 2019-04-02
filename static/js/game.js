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
    constructor(hp, role, position, range, features, cards) {
        this.hp = hp;
        this.hpImage = this.getHpImage();
        this.role = role;
        this.roleImage = this.getRoleImage();
        this.range = range;
        this.position = position;
        this.hand = new Cards(cards);
        this.features = features;
    }

    getHpImage() {
        return `static/images/${this.hp}hp.png`
    }

    getRoleImage() {
        if (this.role === 'Sheriff')
        return `static/images/Sheriff`
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

let player = new Player(4, "Scheriff", 2, 1, 4, bang2miss2);
let enemy1 = new Player(3, "Scheriff", 2, [], 4, bang2miss2);
let enemy2 = new Player(2, "Scheriff", 2, [], 4, bang1miss1);
let enemy3 = new Player(1, "Scheriff", 2, [], 4, bang1miss1);



let frontsideOfPlayer = player.hand.frontSide;
let backsideOfEnemy1 = enemy1.hand.backSide;
let backsideOfEnemy2 = enemy2.hand.backSide;
let backsideOfEnemy3 = enemy3.hand.backSide;


function getImage(src) {
    return `
<img src="/${src}" alt="">
`
}


document.getElementById('playerHand').innerHTML = `
${frontsideOfPlayer.map(getImage).join('')}
`;
document.getElementById('HP').innerHTML = `
${getImage(player.hpImage)}
`;


document.getElementById('enemy1Hand').innerHTML = `
${backsideOfEnemy1.map(getImage).join('')}
`;
document.getElementById('enemy1HP').innerHTML = `
${getImage(enemy1.hpImage)}
`;



document.getElementById('enemy2Hand').innerHTML = `
${backsideOfEnemy2.map(getImage).join('')}
`;
document.getElementById('enemy2HP').innerHTML = `
${getImage(enemy2.hpImage)}
`;


document.getElementById('enemy3Hand').innerHTML = `
${backsideOfEnemy3.map(getImage).join('')}
`;
document.getElementById('enemy3HP').innerHTML = `
${getImage(enemy3.hpImage)}
`;
