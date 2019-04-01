function Player(hp, role, position, range, hand, features) {
    this.hp = hp;
    this.role = role;
    this.range = range;
    this.hand = hand;
    this.features = features;
    this.bang = function(target) {}
}

let raj = new Player(4, "Scheriff", 2, [], []);


function Cards() {
    this.bang = 2;
    this.missed = 2;

    this.removeCard = function(card) {
        this.hand[card]
    }
}

let rajHand = new Cards();
alert(rajHand.bang);
rajHand.removeCard('bang');
alert(rajHand.bang);