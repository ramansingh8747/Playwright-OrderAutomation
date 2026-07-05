const userData = require('../testdata/userData.json');
import { test, expect } from '@playwright/test';
import { LoginPage } from '../frontend/LoginPage';
import { HomePage } from '../frontend/HomePage';
import { ProductPage } from '../frontend/ProductPage';
import { CartPage } from '../frontend/CartPage';
import { AddressPage } from '../frontend/AddressPage';
import { PaymentPage } from '../frontend/PaymentPage';
import { ThreeDSPage } from '../frontend/ThreeDSPage';
import { ThankYouPage } from '../frontend/ThankYouPage';
import { MyOrdersPage } from '../frontend/MyOrderPage';
import { OrderInfoPage } from '../frontend/OrderInfoPage';
import { PdfReader } from '../utils/PdfReader';
import { PdfParser } from '../utils/PdfParser';
import { Calculator } from '../utils/Calculator';
import { Compare } from '../utils/Compare';
const config = require('../config/config');


test('Frontend Login', async ({ page }) => {

    // Object Creation
    const loginPage = new LoginPage(page);
    const cartPage = new CartPage(page);
    const homePage = new HomePage(page);
    const paymentPage = new PaymentPage(page);
    const productPage = new ProductPage(page);
    const addressPage = new AddressPage(page);
    //const reviewPage = new ReviewPage(page);
    const threeDSPage = new ThreeDSPage(page);
    const thankYouPage = new ThankYouPage(page);
    const myOrdersPage = new MyOrdersPage(page);
    const orderInfoPage = new OrderInfoPage(page);
    const pdfReader = new PdfReader();
    const pdfParser = new PdfParser();
    const calculator = new Calculator();
    const compare = new Compare();

    // Launch Website
    await page.goto(config.loginURL, {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });
    //await loginPage.login('587574337', '12345678');
    await loginPage.login(
        userData.mobile,
        userData.password
    );

    // Home Page
    await homePage.openHome();
    await homePage.openEntertainmentCategory();

    // Product Page
    await productPage.addProductToCart();


    // Cart Page
    await cartPage.proceedToCheckout();

    // Address Page

    await addressPage.continueToPayment();

    console.log("After Address:", page.url());

    await page.waitForTimeout(60000);

    console.log("After 3 sec:", page.url());

    //await reviewPage.continueToPayment();

    // Review Page

    //await reviewPage.continueToPayment();

    // Payment Page
    await paymentPage.makePayment(
        userData.cardNo,
        userData.month,
        userData.year,
        userData.holder,
        userData.cvv
    );
    // await paymentPage.makePayment(
    //         '4572691010000046',
    //         '02',
    //         '29',
    //         'Raman',
    //         '123'
    //     );

    await threeDSPage.submitOTP('1234');

    // Thank You Page
    await thankYouPage.verifyOrderPlaced();
    //await thankYouPage.goToMyOrders();

    // My Orders Page
    //await thankYouPage.verifyOrderPlaced();

    // Direct My Orders page
    await page.goto(config.myOrdersURL, {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });

    await myOrdersPage.openLatestOrder();

    // Order Info Page
    const orderNo = await orderInfoPage.getOrderNumber();

    console.log("UI Order Number :", orderNo);

    // Download Invoice
    const pdfPath = await orderInfoPage.downloadInvoice();

    console.log("PDF Path :", pdfPath);

    // Read PDF
    const pdfText = await pdfReader.read(pdfPath);

    console.log("PDF Text :");
    console.log(pdfText);

    // Parse PDF
    const invoice = PdfParser.parse(pdfText);
    console.log(invoice);

    console.log("Parsed Invoice :");
    console.log(invoice);

    // Calculate Expected Values
    const expectedVAT = Calculator.calculateVAT(
        invoice.subtotal,
        6
    );

    const expectedGrandTotal = Calculator.calculateGrandTotal(
        invoice.subtotal,
        expectedVAT
    );

    console.log("Expected VAT :", expectedVAT);
    console.log("Expected Grand Total :", expectedGrandTotal);

    // Validation
    expect(invoice.tax).toBe(expectedVAT);

    expect(invoice.grandTotal).toBe(expectedGrandTotal);

    expect(invoice.paidByCard).toBe(expectedGrandTotal);


    // UI Data
    const uiData = {
        orderNo: orderNo,
        productName: await orderInfoPage.getProductName(),
        unitPrice: await orderInfoPage.getUnitPrice(),
        quantity: await orderInfoPage.getQuantity(),
        discount: await orderInfoPage.getDiscount(),
        totalCost: await orderInfoPage.getTotalCost(),
        paidByCard: await orderInfoPage.getPaidByCard()
    };

    console.log(uiData);


    //comparing UI data with PDF data
    Compare.validate(uiData, invoice);
});