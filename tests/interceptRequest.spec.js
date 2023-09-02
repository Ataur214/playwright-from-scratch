const { test,expect } = require('@playwright/test');

test("Request intercept ", async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/client');
    await expect(page).toHaveTitle("Let's Shop");
    const email = 'noiceataure@gmail.com';
    const loginEmail = page.locator('#userEmail');
    const userPass = page.locator('#userPassword');
    const loginButton = page.locator('#login');
    const loginPageTitle = page.locator('h3+p');

    await loginEmail.type(email);
    await userPass.type('@Ata1234');
    await page.screenshot({path:'screenshots/screenshot.png'})
    await loginButton.click();
    await page.waitForLoadState('networkidle');
    await expect(loginPageTitle).toHaveText("Automation Practice");
    await page.locator('[routerlink*="myorders"]').click();

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=64f047197244490f95a24499' }))

    await page.getByRole('button', { name: 'View' }).first().click();
    await expect(page.locator('p.blink_me')).toHaveText('You are not authorize to view this order');
})