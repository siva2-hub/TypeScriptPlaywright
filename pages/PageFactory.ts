import { Browser, Page } from "@playwright/test";

export class PageFactory{
    readonly browser: Browser;
    page: Page;
    constructor(browser: Browser){
        this.browser = browser;
    }
    async getContext(){
        const context = await this.browser.newContext();
        return context;
    }
    async getPage(){
        const context = await this.getContext();
        this.page = await context.newPage();
        return this.page;
    }
    async openPage(){
        await this.page.goto(process.env.PAGEURL!);
    }
    async closePage(){
        await this.page.close();
    }
}