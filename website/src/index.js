// you can import css in your js file!
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'

// If you want to use jquery
import $ from 'jquery'

// TODO



class Gift {
    constructor(weight, preparation_time){
        this.weight =weight
        this.preparation_time = preparation_time
    }

    prepareGift(){
        setTimeout(function() {
            // Code…
            console.log("test")
        }, this.preparation_time);
    }

}

class SmallGift extends Gift{
    constructor(){
        super(1, 0.5)
    }
}

class NormalGift extends Gift{
    constructor(){
        super(2, 1)
    }
}

class BigGift extends Gift{
    constructor(){
        super(5, 2)
    }
}


const giftFactory = (type) => {
    switch(type){
        case "Small" : return new SmallGift();
        case "Normal" : return new NormalGift();
        case "Big" : return new BigGift();
        default : return null;
    }
}


    const smallGift = giftFactory("Small")
    smallGift.prepareGift()
    console.log("tet")
   





