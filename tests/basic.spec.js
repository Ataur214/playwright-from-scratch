const {test, expect} = require('@playwright/test');

test('open the browser', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/locatorspractice/');
    console.log(await page.title());
});

test('without context open the browser', async ({page})=>{
    await page.goto('https://playwright.dev/docs/intro');
    await expect(page).toHaveTitle('Installation | Playwright');
});
