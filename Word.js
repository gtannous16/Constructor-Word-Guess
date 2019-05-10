let Letter = require('./Letter');

class Word {
    constructor(word) {
        this.word = word;
        this.splitLetters = [];
        this.convertedLetters = []
        this.guessedLetters = [];
        this.show =[];
    }

    
    convert(){
        for (let i = 0; i < this.splitLetters.length; i++){
           
            var ltr = new Letter(this.splitLetters[i]);
            if(ltr.letter === " "){
                ltr.hasGuessed = true;
            }
            this.convertedLetters.push(ltr);
            this.show.push(ltr.switcher());
        }
        
        console.log(this.show.join(" ") + "\n")
    }


    guesser(guess){
        let ltr = guess.toUpperCase()
        this.show = [];

            for (let i = 0; i < this.convertedLetters.length; i++){
            
                if(this.convertedLetters[i].letter === ltr){  

                this.convertedLetters[i].checker(guess);
               
                }

                this.show.push(this.convertedLetters[i].switcher());
            } 
        

        console.log(this.show.join(" ") + "\n");
    
    }
}


module.exports = Word;
