import { Browser, ElementHandle, Locator, Page } from "@playwright/test";
import * as XLSX from "xlsx";
import { PageFactory } from "./PageFactory";
import dotenv from 'dotenv';
dotenv.config();

export const validUserName = process.env.user_name!;
export const validPassword = process.env.password!;
export class LoginPage {
    readonly page: Page;
    readonly userNameField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly cartIcon: Locator;
    readonly openMenu: Locator;
    readonly logoutLink: Locator;
    readonly errorButton: Locator;
    readonly errorText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userNameField = page.locator('#user-name');
        this.passwordField = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.cartIcon = page.locator('#shopping_cart_container');
        this.openMenu = page.locator('.bm-burger-button');
        this.logoutLink = page.locator('#logout_sidebar_link');
        this.errorButton = page.locator('[data-test="error-button"]');
        this.errorText = page.locator('[data-test="error"]');
    }
    async login(userName: string, password: string) {
        await this.userNameField.fill(userName);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
    async logout() {
        await this.openMenu.scrollIntoViewIfNeeded();
        await this.openMenu.click();
        await this.logoutLink.isVisible();
        await this.logoutLink.click();
    }
    async readExcelDataFromSingleSheet(filePath: string) {
        const wb = XLSX.readFile(filePath);
        const ws = wb.SheetNames[0];
        const sheet = wb.Sheets[ws];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        console.log(jsonData);
    }
    async readExcelDataFromMultipleSheet(filePath: string) {
        const wb = XLSX.readFile(filePath);
        let allData:any[]=[];
        wb.SheetNames.forEach(sheetName => {
            const sheet = wb.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet);
            allData.push(data);
        })
        console.log(allData);
    }
    async readExcelDataFromMultipleFiles(filePaths: string[]) {
        let allData:any[]=[];
        filePaths.forEach(filePath => {
            const workbook=XLSX.readFile(filePath);
            const ws = workbook.SheetNames.forEach(sheetName=>{
                const sheet = workbook.Sheets[sheetName];
                const data = XLSX.utils.sheet_to_json(sheet);
                allData.push(data);
            })
        });
        console.log(allData);
    }

}