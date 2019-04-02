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
        this.role = role;
        this.range = range;
        this.position = position;
        this.hand = cards;
        this.features = features;
    }

    bang(target) {
        if (this.hand.bang > 0 && target.hand.missed === 0) {
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
        this.hand[card] -= 1;
    };

    draw2FromDeck() {

    }
}


class Cards {
    constructor(object) {
        this.items = object;
        this.cardsArray = this.dictToArray();
        this.frontSide = this.getFrontside(); //gives back an array of the links
    }

    dictToArray() {
        let fArray = [];
        let keys = Object.keys(this.items);
        let values = Object.values(this.items);
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
            else if(item === 'missed')
        }
        return frontSideArray
    }


}


let bang2miss2 = {'bang': 2, 'missed': 2};
let raj = new Player(4, "Scheriff", 2, 1, 4, bang2miss2);
let dombi = new Player(4, "Scheriff", 2, [], 4, bang2miss2);

// alert('dombi hp: ' + dombi.hp );
// alert('raj bangs: ' + raj.hand['bang']);
//
// raj.bang(dombi);
//
// alert('dombi hp: ' + dombi.hp );
// alert('raj bangs: ' + raj.hand['bang']);
let asdasd = new Cards(bang2miss2);
for (frontside of asdasd.frontSide) {
    alert(frontside)
}