const {test, expect} = require('@playwright/test');

test('Visual Testing - Compare the two image to find the difference', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/locatorspractice/');
    console.log(await page.title());
    expect(await page.screenshot()).toMatchSnapshot('homepage.png');
});