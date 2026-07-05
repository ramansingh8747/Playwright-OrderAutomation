export class CartPage {

    constructor(page) {
        this.page = page;

        this.continueToCheckout = page.getByRole('link', {
            name: 'CONTINUE TO CHECKOUT'
        });

        this.continueToPayment = page.getByRole('link', {
            name: 'CONTINUE TO Payment'
        });
    }

    async proceedToCheckout() {
        await this.continueToCheckout.click();
        await this.continueToPayment.click();
    }
}