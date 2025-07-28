import { Page, test } from '@playwright/test';
import { PageFactory } from '../pages/PageFactory';
import { LoginPage } from '../pages/LoginPage';
import { validPassword, validUserName } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';

let page: Page;
let loginPage: LoginPage;
let cartPage: CartPage;
test.beforeAll(async({browser})=>{
    const pageFactory=new PageFactory(browser);
    page = await pageFactory.getPage();
    await pageFactory.openPage();
    loginPage = new LoginPage(page);
})
test('should add items to cart', async () => {
   await loginPage.login(validUserName, validPassword);
   cartPage = new CartPage(page);
   await cartPage.checkItemsAtCartPage();
})
