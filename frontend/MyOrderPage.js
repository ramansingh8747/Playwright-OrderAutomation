import { expect } from '@playwright/test';

export class MyOrdersPage {

    constructor(page) {
        this.page = page;

        this.orderInfo = page.getByRole('button', {
            name: 'Order Info'
        }).first();
    }

    async openLatestOrder() {
        // Orders list load hone ka wait (extra safety)
        await expect(this.orderInfo).toBeVisible({ timeout: 15000 });
        await this.orderInfo.click();
    }
}