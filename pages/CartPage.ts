import { Page, Locator } from "@playwright/test";

export class CartPage {
    readonly page: Page;
    readonly addToCartButton: Locator;
    readonly cartIcon: Locator;
    readonly continueShoppingButton: Locator;
    readonly itemsCountCart: Locator;
    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = page.locator("//*[@class='pricebar']/button");
        this.cartIcon = page.locator('#shopping_cart_container');
        this.continueShoppingButton = page.locator('#continue-shopping');
        this.itemsCountCart = page.locator('.shopping_cart_badge');
    }

    async addToCart() {
        let addToCartButtons = this.addToCartButton;
        let itemsCountAtPage = await addToCartButtons.count();
        for (let index = 0; index < itemsCountAtPage; index++) {
            await addToCartButtons.nth((index)).scrollIntoViewIfNeeded();
            await addToCartButtons.nth((index)).click();
            await this.cartIcon.click();
            await this.continueShoppingButton.isVisible();
            await this.continueShoppingButton.click();
        }
        return itemsCountAtPage;
    }
    async checkItemsAtCartPage() {
        let res = false;
        let itemsCount = await this.addToCart();
        let itemsCountAtCart = await this.itemsCountCart.textContent();
        if (itemsCount == Number(itemsCountAtCart)) {
            res = true;
        } else {}
        console.log(`Total items count is ${itemsCount}\nitmes added to cart is ${itemsCountAtCart}`)
        return res;
    }
}