import { test, expect, Page } from '@playwright/test';
import { LoginPage, validUserName, validPassword } from '../pages/LoginPage';
import { PageFactory } from '../pages/PageFactory';

let page: Page;
let loginPage: LoginPage;
const testData = [
  { username: 'standard_user', password: 'secret_sauce12', error: 'Epic sadface: Username and password do not match any user in this service' },
  { username: '122333', password: 'secret_sauce', error: 'Epic sadface: Username and password do not match any user in this service' },
  { username: 'locked_out_use111r', password: '', error: 'Epic sadface: Password is required' },
  { username: '', password: 'secret_sauce12', error: 'Epic sadface: Username is required' },
  { username: '', password: '', error: 'Epic sadface: Username is required' }
];

test.describe.serial('Login Test Parameterized', async () => {
  test.beforeAll(async ({ browser }) => {
    const pageFactory = new PageFactory(browser);
    page = await pageFactory.getPage();
    await pageFactory.openPage();
  })

  test(`Login Test valid Data`, async () => {
    loginPage = new LoginPage(page);
    loginPage.readExcelDataFromMultipleFiles(["file1.xlsx","file2.xlsx"]);
    await loginPage.login(validUserName, validPassword);
    await loginPage.cartIcon.isVisible();
    console.log('login success');
  });
  test('Logout Test ', async () => {
    await loginPage.logout();
    await loginPage.userNameField.isVisible();
    console.log('logout success');
  })
  test('Login Test invalid data', async () => {
    let isInValid = false;
    for (const data of testData) {
      await loginPage.login(data.username, data.password);
      if (await loginPage.errorText.textContent() == data.error) {
        await loginPage.errorButton.click(); isInValid = true;
        console.log(`Login failed with username: ${data.username} and password: ${data.password}`);
      } else { isInValid = false; }
    }
    if (isInValid) {
      console.log('All invalid login tests passed');
    } else {
      console.log('Some invalid login tests failed');
    }
  });


});
