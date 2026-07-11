const users = require('../testdata/users.json');
const cards = require('../testdata/cards.json');
const products = require('../testdata/products.json');

class TestDataManager {
    constructor() {
        this.users = users;
        this.cards = cards;
        this.products = products;
    }

    getTestData(index) {
        return {
            user: this.users[index],
            card: this.cards[index % this.cards.length],
            product: this.products[index % this.products.length]
        };
    }
}

module.exports = TestDataManager;