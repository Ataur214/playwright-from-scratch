const {test, expect} = require('@playwright/test');

test('open the browser', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com');
    console.log(await page.title());
    expect(await page.screenshot()).toMatchSnapshot('homepage.png');
});