import { expect } from '@playwright/test';

export class ThankYouPage {

    constructor(page) {
        this.page = page;

        this.thankYouSection = page.locator('#thanku_page');
    }

    async verifyOrderPlaced() {
        await expect(this.thankYouSection).toBeVisible({
            timeout: 60000
        });
    }
}