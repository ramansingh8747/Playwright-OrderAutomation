export class ProductPage {

    constructor(page) {
        this.page = page;

        this.productCards = page.locator('div.px-4.pt-3');

        this.addToBagButton = page.getByRole('link', {
            name: 'Add to bag'
        });
    }

    async addProductToCart(product) {
        const productCard = this.productCards.filter({
            has: this.page.locator('h3.skusearch_product_title', {
                hasText: product.name
            })
        });

        console.log("Selected Product:", product.name);
        console.log("Matching Products:", await productCard.count());

        const buyButton = productCard.locator('a.btn.btn-primary');

        console.log("BUY Button Count:", await buyButton.count());

        await buyButton.click();

        await this.addToBagButton.click();
    }
}