import {
    Sled
} from './sled.js'
import {
    Dwarf
} from './dwarf.js'

export class GiftsFactory {
    constructor() {
        this.dwarf = new Dwarf();
        this.sled = new Sled();
        this.message = ""
    }

    async displayGiftStatus(type) {
        try {
            return this.message = await this.dwarf.createGift(type, this.sled)
        } catch (err) {
            return this.message = err
        }
    }

    async displaySledStatus() {
        try {
            return this.message = await this.sled.deliver(this.dwarf)
        } catch (err) {
            return this.message = err
        }
    }

    async reset() {
        try {
            const a = await this.sled.reset()
            const b = await this.dwarf.reset()
            return this.message = a + b
        } catch (err) {
            return this.message = err
        }

    }

}