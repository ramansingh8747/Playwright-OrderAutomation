import { test as base, expect } from '@playwright/test';
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




export const test = base.extend({

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    homePage: async ({ page }, use) => {
    await use(new HomePage(page));
},

productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
},

cartPage: async ({ page }, use) => {
    await use(new CartPage(page));

},
addressPage: async ({ page }, use) => {
    await use(new AddressPage(page));
},

paymentPage: async ({ page }, use) => {
    await use(new PaymentPage(page));
},

threeDSPage: async ({ page }, use) => {
    await use(new ThreeDSPage(page));
},

thankYouPage: async ({ page }, use) => {
    await use(new ThankYouPage(page));
},

MyOrderPage: async ({ page }, use) => {
    await use(new MyOrderPage(page));
},

OrderinfoPage: async ({ page }, use) => {
    await use(new OrderinfoPage(page));
}



});

export { expect };