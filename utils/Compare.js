import { expect } from '@playwright/test';

export class Compare {

    static validate(uiData, pdfData) {

        expect(uiData.orderNo).toBe(pdfData.orderNo);
        //expect(uiData.productName).toBe(pdfData.productName);
        //expect(uiData.unitPrice).toBe(pdfData.unitPrice);
        //expect(uiData.quantity).toBe(pdfData.quantity);
        expect(uiData.discount).toBe(pdfData.discount);
        expect(uiData.totalCost).toBe(pdfData.grandTotal);
        expect(uiData.paidByCard).toBe(pdfData.paidByCard);

        console.log("✅ UI vs PDF Validation Passed");
    }
}