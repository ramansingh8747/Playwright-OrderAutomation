export class HomePage {

    constructor(page) {
        this.page = page;

        this.logo = page.getByRole('link', {
            name: 'Logo'
        });

        this.entertainment = page.getByRole('link', {
            name: 'Entertainment Entertainment'
        });
    }

    async openHome() {
        await this.logo.click();
    }

    async openEntertainmentCategory() {
        await this.entertainment.click();
    }
}