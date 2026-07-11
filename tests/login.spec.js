import { test, expect } from '../fixtures/baseFixture';
import { CONSTANTS } from '../config/constants';
//import { test, expect } from '@playwright/test';
import { LoginPage } from '../frontend/LoginPage';
import { HomePage } from '../frontend/HomePage';
import { ProductPage } from '../frontend/ProductPage';
import { CartPage } from '../frontend/CartPage';
import { AddressPage } from '../frontend/AddressPage';
import { PaymentPage } from '../frontend/PaymentPage';
import { ThreeDSPage } from '../frontend/ThreeDSPage';
import { ThankYouPage } from '../frontend/ThankYouPage';
import { MyOrderPage } from '../frontend/MyOrderPage';
import { OrderinfoPage } from '../frontend/OrderinfoPage';
import { PdfReader } from '../utils/PdfReader';
import { PdfParser } from '../utils/PdfParser';
import { Calculator } from '../utils/Calculator';
import { Compare } from '../utils/Compare';

const cards = require('../testdata/cards.json');
const users = require('../testdata/users.json');
const products = require('../testdata/products.json');
const TestDataManager = require('../utils/TestDataManager');

const testDataManager = new TestDataManager();
console.log(testDataManager.users.length);
console.log(testDataManager.cards.length);
console.log(testDataManager.products.length);

//const config = require('../config/config');



// userData.forEach((card) => {

//     test(`Frontend Login - ${card.holder}`, async ({
//         page,
//         loginPage,
//         homePage,
//         productPage,
//         cartPage,
//         addressPage,
//         paymentPage,
//         threeDSPage,
//         thankYouPage,
//         MyOrderPage,
//         OrderinfoPage
//     }) => {

//         // Yahan tumhara pura existing test code rahega

//     });

// });

testDataManager.users.forEach((_, index) => {


    test(
        `Frontend Login - ${testDataManager.getTestData(index).user.mobile}`,
        async ({ page, loginPage, homePage, productPage, cartPage, addressPage, paymentPage, threeDSPage, thankYouPage, MyOrderPage, OrderinfoPage }) => {

            // Object Creation
            //const loginPage = new LoginPage(page);
            //const cartPage = new CartPage(page);
            //const homePage = new HomePage(page);
            //const paymentPage = new PaymentPage(page);
            //const productPage = new ProductPage(page);
            //const addressPage = new AddressPage(page);
            //const reviewPage = new ReviewPage(page);
            //const threeDSPage = new ThreeDSPage(page);
            // const thankYouPage = new ThankYouPage(page);
            // const myOrdersPage = new MyOrdersPage(page);
            // const orderInfoPage = new OrderInfoPage(page);
            const pdfReader = new PdfReader();
            const pdfParser = new PdfParser();
            const calculator = new Calculator();
            const compare = new Compare();


            // const card = cards[index % cards.length]; // Cycle through cards if there are more users than cards
            // const product = products[index % products.length]; // Cycle through products if there are more users than products
            const { user, card, product } = testDataManager.getTestData(index); // Get user, card, and product for the current index


            //const user = users[0];



            // Launch Website
            await page.goto(process.env.LOGIN_URL, {
                waitUntil: 'domcontentloaded',
                timeout: 10000
            });
            await loginPage.login(
                _.mobile,
                _.password
            );
            // await page.goto(config.loginURL, {
            //     waitUntil: 'domcontentloaded',
            //     timeout: 60000
            // });
            //await loginPage.login('587574337', '12345678');
            // await loginPage.login(
            //     userData.mobile,
            //     userData.password
            // );
            // await loginPage.login(
            //     process.env.MOBILE,
            //     process.env.PASSWORD
            // );

            // Home Page
            await homePage.openHome();
            await homePage.openEntertainmentCategory();

            // Product Page
            await productPage.addProductToCart(product);


            // Cart Page
            await cartPage.proceedToCheckout();

            // Address Page

            await addressPage.continueToPayment();

            console.log("After Address:", page.url());

            await page.waitForTimeout(10000);

            console.log("After 3 sec:", page.url());

            //await reviewPage.continueToPayment();

            // Review Page

            //await reviewPage.continueToPayment();

            // const userData = require('../testdata/userData.json');
            // const card = userData[0];

            console.log(`User: ${user.mobile}`);
            console.log(`Card: ${card.cardNo}`);

            // Payment Page
            await paymentPage.makePayment(
                card.cardNo,
                card.month,
                card.year,
                card.holder,
                card.cvv
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
            await page.goto(process.env.MY_ORDERS_URL, {
                waitUntil: 'domcontentloaded',
                timeout: 60000
            });

            await MyOrderPage.openLatestOrder();

            // Order Info Page
            const orderNo = await OrderinfoPage.getOrderNumber();

            console.log("UI Order Number :", orderNo);

            // Download Invoice
            const pdfPath = await OrderinfoPage.downloadInvoice();

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
            const expectedVAT = invoice.tax;

            const expectedGrandTotal = invoice.grandTotal;

            console.log("Expected VAT :", expectedVAT);
            console.log("Expected Grand Total :", expectedGrandTotal);

            // Validation
            expect(invoice.tax).toBe(expectedVAT);

            expect(invoice.grandTotal).toBe(expectedGrandTotal);

            expect(invoice.paidByCard).toBe(expectedGrandTotal);


            // UI Data
            const uiData = {
                orderNo: orderNo,
                productName: await OrderinfoPage.getProductName(),
                unitPrice: await OrderinfoPage.getUnitPrice(),
                quantity: await OrderinfoPage.getQuantity(),
                discount: await OrderinfoPage.getDiscount(),
                totalCost: await OrderinfoPage.getTotalCost(),
                paidByCard: await OrderinfoPage.getPaidByCard()
            };

            console.log(uiData);


            //comparing UI data with PDF data
            Compare.validate(uiData, invoice);
        });

});