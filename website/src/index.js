// you can import css in your js file!
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
// If you want to use jquery
import $ from 'jquery'
const axios = require('axios');

// TODO
let sled = []
let isworking = false;
let isdelivering = false;

$(document).ready(function () {
    $('#Small').click(function () {
        const smallGift = giftFactory("Small")
        giftHandler(smallGift)
    });

    $('#Normal').click(function () {
        const normalGift = giftFactory("Normal")
        giftHandler(normalGift)
    });


    $('#Big').click(function () {
        const bigGift = giftFactory("Big")
        giftHandler(bigGift)
    });

    $('#Deliver').click(function () {
        deliver()
    });
});

async function giftHandler(gift) {
    if (!isworking) {
        if(!isdelivering){
        try {
            $('#Text').html("in work")
            isworking = true
            await gift.prepareGift()
            $('#Text').html(addGift(gift));
            $('#Sled').html(displaySled())
        } catch (err) {
            return err
        }
    }else{
        $('#Text').html('Dwarf says : the sled is not here, so why would I bother?!')
    } }else {
        $('#Text').html("dwarf is busy")
    }
}

function displaySled() {
    let str = ""
    for (let i = 0; i < sled.length; i++) {
        str += "<li> Gift " + (i + 1) + " : " + sled[i].constructor.name + "</li>"
    }
    return str
}

function addGift(gift) {
    let sum = 0
    for (let i = 0; i < sled.length; i++) {
        sum += sled[i].weight
    }
    sum += gift.weight
    if (sum <= 12) {
        sled.push(gift)
        return "ok"
    } else {
        return "it's to heavy, I cannot add this gift to the sled"
    }
}

function deliver() {
    if (!isdelivering) {
        if (sled.length > 0) {
            isdelivering = true;
            axios.post('http://localhost:8081', {
                    gifts: sled
                })
                .then(function () {
                    sled = []
                    $('#Sled').html("")
                    $('#Text').html("Gifts have been delivered")
                    isdelivering = false;
                })
                .catch(function () {
                    isdelivering = false;
                    $('#Text').html("These stupids reindeers are hungry, try again !")
                });
        } else {
            $('#Text').html("Sled empty")
        }
    } else {
        $('#Text').html("Reindeers are delivering !")
    }
}


class Gift {
    constructor(weight, preparation_time) {
        this.weight = weight
        this.preparation_time = preparation_time
    }

    prepareGift() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                isworking = false
                resolve("ok")
            }, (this.preparation_time * 1000))
        })
    }

}

class SmallGift extends Gift {
    constructor() {
        super(1, 0.5)
    }
}

class NormalGift extends Gift {
    constructor() {
        super(2, 1)
    }
}

class BigGift extends Gift {
    constructor() {
        super(5, 2)
    }
}
const giftFactory = (type) => {
    switch (type) {
        case "Small":
            return new SmallGift();
        case "Normal":
            return new NormalGift();
        case "Big":
            return new BigGift();
        default:
            return null;
    }
}