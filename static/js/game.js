function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}


let myArray = ['1','2','3','4','5','6','7','8','9'];
alert(myArray + '\n' + shuffle(myArray) + '\n' + shuffle(shuffle(myArray)));
