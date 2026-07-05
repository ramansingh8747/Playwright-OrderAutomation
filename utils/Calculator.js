export class Calculator {

    // Calculate VAT Amount
    static calculateVAT(subTotal, vatPercent) {

        return +(subTotal * vatPercent / 100).toFixed(2);

    }

    // Calculate Grand Total
    static calculateGrandTotal(subTotal, vatAmount) {

        return +(subTotal + vatAmount).toFixed(2);

    }

    // Verify Paid Amount
    static calculatePaidAmount(grandTotal) {

        return +grandTotal.toFixed(2);

    }

}