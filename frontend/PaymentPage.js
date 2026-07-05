export class PaymentPage {

    constructor(page) {
        this.page = page;

        this.cardButton = page.getByRole('button', { name: 'Card Card' });
        this.cardNumber = page.getByRole('textbox', { name: 'Enter 16 digit card number' });
        this.month = page.getByRole('textbox', { name: 'MM' });
        this.year = page.getByRole('textbox', { name: 'YY' });
        this.cardHolder = page.getByRole('textbox', { name: 'Name on Card' });
        this.cvv = page.getByRole('textbox', { name: 'CVV' });
        this.payButton = page.getByRole('button', { name: 'Pay with' });
    }

    async makePayment(cardNo, month, year, holder, cvv) {

    // Bas seedha click - agar button jaldi mil gaya to jaldi hi click ho jayega
    await this.cardButton.click({ timeout: 20000 });

    await this.page.waitForTimeout(1000);

    await this.cardNumber.click();
    await this.cardNumber.fill(cardNo);
    await this.month.fill(month);
    await this.year.fill(year);
    await this.cardHolder.click();
    await this.cardHolder.fill(holder);
    await this.cvv.click();
    await this.cvv.fill(cvv);

    await this.payButton.click();
}
}