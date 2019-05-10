
class Letter {

    constructor(letter) {
       
        this.letter = letter.toUpperCase();
      
        this.underscore = '_';
       
        this.hasGuessed = false;
    }


    switcher() {

        if (this.hasGuessed === true) {
            
            return this.letter;
        }
        else {
            
            return this.underscore;
        }
    }

    checker(guess) {
        if (this.letter === guess) {
            this.hasGuessed = true;
        }
    };

}

module.exports = Letter;











