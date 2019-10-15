import {
    giftFactory
} from './gift.js'

export class Dwarf {
    constructor() {
        this.isWorking = false;
    }
    reset() {
        if (!this.isWorking) {
            this.gifts = []
            return ""
        } else {
            return " Dwarf is working"
        }
    }
    prepareGift(gift) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.isWorking = false
                resolve("ok")
            }, (gift.preparation_time * 1000))
        })
    }
    dwarfWorking() {
        return this.isWorking
    }
    async createGift(type, sled) {
        const gift = giftFactory(type)
        if (!sled.isDelivering) {
            if (!sled.isTooHeavy(gift)) {
                if (!this.isWorking) {
                    this.isWorking = true
                    try {
                        await this.prepareGift(gift)
                    } catch (err) {
                        return err
                    }
                    sled.gifts.push(gift)
                    return "Gift added successfully to the sled"
                } else {
                    return "Dwarf is working"
                }
            } else {
                return "Sled too Heavy"
            }
        } else {
            return 'Dwarf says : the sled is not here, so why would I bother?!'
        }
    }
}