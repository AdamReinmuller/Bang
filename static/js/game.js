let fullDeck = {
    'bang': 5,
    'missed': 5
};



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
        if (this.hand.bang > 0) {
            target.hp -= 1;
            this.removeCard('bang');
        }
    };
    removeCard(card) {
        this.hand[card] -= 1;
    };

    draw2FromDeck() {

    }
}


function Card(name, frontimage, backimage, visible) {
    this.name = name;
    this.frontside = frontimage;
    this.backside = backimage;
    this.visible = visible;
}


let bang2miss2 = {'bang': 2, 'missed': 2};
let raj =  new Player(4, "Scheriff", 2, 1, 4, bang2miss2);
let dombi = new Player(4, "Scheriff", 2, [], 4, bang2miss2);

alert('dombi hp: ' + dombi.hp );
alert('raj bangs: ' + raj.hand['bang']);

raj.bang(dombi);

alert('dombi hp: ' + dombi.hp );
alert('raj bangs: ' + raj.hand['bang']);