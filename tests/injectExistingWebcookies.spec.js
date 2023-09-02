const {test,expect} = require('@playwright/test');

let ContextWithCookies;

test.beforeAll( async ({browser})=>{
    const context  = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto('https://rahulshettyacademy.com/client');
    await expect(page).toHaveTitle("Let's Shop");
    const email = 'noiceataure@gmail.com';
    const loginEmail = page.locator('#userEmail');
    const userPass = page.locator('#userPassword');
    const loginButton = page.locator('#login');
    const loginPageTitle = page.locator('h3+p');

    await loginEmail.type(email);
    await userPass.type('@Ata1234');
    await loginButton.click();
    await page.waitForLoadState('networkidle');
    await expect(loginPageTitle).toHaveText("Automation Practice");

    await context.storageState({path:'state.json'});
    ContextWithCookies = await browser.newContext({storageState:'state.json'});

})

test('add product to my card', async ()=>{
    const page = await ContextWithCookies.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    const products = page.locator('.card-body');
    const productName = 'adidas original';
    await products.first().waitFor();
    //Add the product to my card dynamically
    for (let i = 0; i <await products.count(); i++) {
        if (await products.nth(i).locator('b').textContent() == productName) {
            await products.nth(i).getByRole('button', { name: ' Add To Cart' }).click();
            break;
        }
    }
    await myCard.click();
})