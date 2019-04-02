let turnCounter = 0;
let players = [];

let fullDeck = {
    'bang': 8,
    'missed': 8
};



function dictToArray(dict) {
    fArray = [];
    let keys = Object.keys(dict);
    let values = Object.values(dict);
    for (let i = 0; i < keys.length; i++) {
        for (let num = 0; num < values[i]; num++) {
            fArray.push(keys[i])
        }
    }
    return fArray
}



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
debugger;

class Cards {
    constructor(array) {
        this.bang = array['bang'];
            bang.number = bang.length;
            bang.frontside = 'static/cards/bang.jpg';
            bang.backside = '123';
            bang.visible = visible;

        this.missed = array['missed'];
            missed.number = missed.length;
            missed.frontside = 'static/cards/missed.jpg';
            missed.backside = '123';
            missed.visible = visible;
    }
    getCardTypeNumber(type) { //return the number of cards of 'type'

    }
}




function setup() {

    let bang2miss2 = {'bang': 2, 'missed': 2};
    let raj =  new Player(4, "Scheriff", 2, 1, 4, bang2miss2);
    let dombi = new Player(4, "Scheriff", 2, [], 4, bang2miss2);
    debugger;


}

function draw() {
    console.log(players);
    turnCounter++;

}

