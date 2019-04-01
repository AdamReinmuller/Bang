function Player(hp, role, position, range, features) {
    this.hp = hp;
    this.role = role;
    this.range = range;
    this.hand = new Cards();
    this.features = features;

    this.bang = function(target) {
        target.hp -= 1;
        this.hand.removeCard('bang');
    }
}


function Cards() {
    this.values = {
        'bang' : 2,
        'missed' : 2
    };

    this.removeCard = function(card) {
        this.values[card] -= 1;
    };
    this.shoot = function (target) {

    }
}


let raj = new Player(4, "Scheriff", 2, []);
let dombi = new Player(4, "Scheriff", 2, []);

alert(dombi.hp );
alert(raj.hand.values['bang']);

raj.bang(dombi);

alert(dombi.hp );
alert(raj.hand.values['bang']);