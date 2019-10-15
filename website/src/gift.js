class Gift {
    constructor(weight, preparation_time) {
        this.weight = weight
        this.preparation_time = preparation_time
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

export const giftFactory = (type) => {
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