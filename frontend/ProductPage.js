export class ProductPage {

    constructor(page) {
        this.page = page;

        this.buyButton = page.getByRole('link', { name: 'BUY' });

        this.addToBagButton = page.getByRole('link', {
            name: 'Add to bag'
        });
    }

    async addProductToCart() {
        await this.buyButton.nth(3).click();
        await this.addToBagButton.click();
    }
}