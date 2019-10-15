const axios = require('axios');
export class Sled {
    constructor() {
        this.gifts = []
        this.isDelivering = false;
    }


    reset() {
        if (!this.isDelivering) {
            this.gifts = []
            return ""
        } else {
            return "Reindeers are delivering !"
        }

    }

    isTooHeavy(gift) {
        let sum = 0
        for (let i = 0; i < this.gifts.length; i++) {
            sum += this.gifts[i].weight
        }
        sum += gift.weight
        if (sum <= 12) {
            return false
        } else {
            return true
        }
    }

    displaySled() {
        let str = ""
        for (let i = 0; i < this.gifts.length; i++) {
            str += "<li> Gift " + (i + 1) + " : " + this.gifts[i].constructor.name + "</li>"
        }
        return str
    }

    async deliver(dwarf) {
        if (!dwarf.isWorking) {
            if (!this.isDelivering) {
                if (this.gifts.length > 0) {
                    this.isDelivering = true
                    try {
                        await axios.post('http://localhost:8081', {
                            gifts: this.gifts
                        })
                        this.gifts = []
                        this.isDelivering = false;
                        return "Gifts have been delivered"
                    } catch {
                        this.isDelivering = false;
                        return "Reindeers are hungry"
                    }
                } else {
                    return "Sled empty"
                }
            } else {
                return "Reindeers are delivering !"
            }
        } else {
            return "Dwarf is working"
        }

    }
}