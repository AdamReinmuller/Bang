function Player(hp, role, position, range, hand, features) {
    this.hp = hp;
    this.role = role;
    this.range = range;
    this.hand = hand;
    this.features = features;
    this.bang = function(kit) {
    }
}

let raj = new Player(4, "Scheriff", 2, [], []);

raj.hp += 1;
alert(raj.hp);