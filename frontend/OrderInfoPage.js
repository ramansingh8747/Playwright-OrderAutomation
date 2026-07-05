import { expect } from '@playwright/test';
import path from 'path';

export class OrderInfoPage {

    constructor(page) {
        this.page = page;

        // Order Number
        this.orderNo = page.locator(
            'div.d-flex.justify-content-start.flex-wrap.align-items-center.mb-3 span.text-black'
        ).first();

        // Download Invoice Locator
        this.downloadInvoiceLink = page.getByRole('link', {
            name: 'Download Your Invoice'
        });
        this.productName = page.getByRole('link').filter({
            hasText: 'AppleVisionPro'
        }).first();

        this.totalCost = page.getByText('Total Cost: AED').nth(1);

        this.paidByCard = page.getByText('Paid by Card: AED');

        this.discount = page.getByText('Discount : (-) AED');

        this.quantity = page.getByText(/Qty\s*:\s*\d+/);

        this.unitPrice = page.getByText('AED 1,800').first();
    }


    async getOrderNumber() {

    // Thoda zyada timeout - order info page load hone ka wait
    await expect(this.orderNo).toBeVisible({ timeout: 15000 });

    const text = await this.orderNo.textContent();

    const orderNo = text.replace('Order No:', '').trim();

    console.log("Order Number :", orderNo);

    return orderNo;
}

    async downloadInvoice() {

    const downloadPromise = this.page.waitForEvent('download');

    await this.downloadInvoiceLink.click();

    const download = await downloadPromise;

    const filePath = `downloads/${download.suggestedFilename()}`;

    await download.saveAs(filePath);

    console.log(filePath);

    return filePath;
}

async getProductName() {
    return (await this.productName.textContent()).trim();
}

async getTotalCost() {
    const text = await this.totalCost.textContent();
    return Number(text.replace(/[^\d.]/g, '').replace(',', ''));
}

async getPaidByCard() {
    const text = await this.paidByCard.textContent();
    return Number(text.replace(/[^\d.]/g, '').replace(',', ''));
}

async getDiscount() {
    const text = await this.discount.textContent();
    return Number(text.replace(/[^\d.]/g, '').replace(',', ''));
}

async getQuantity() {
    const text = await this.quantity.textContent();
    return Number(text.match(/\d+/)[0]);
}

async getUnitPrice() {
    const text = await this.unitPrice.textContent();
    return Number(text.replace(/[^\d.]/g, '').replace(',', ''));
}
}