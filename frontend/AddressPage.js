export class AddressPage {

    constructor(page) {
        this.page = page;

        this.continueToPaymentBtn = page.getByRole('link', {
            name: 'CONTINUE TO Payment'
        });
    }

    async continueToPayment() {
        await this.continueToPaymentBtn.click();
    }
}