const {test,expect, request} = require('@playwright/test');

const fakePayLoadOrders = { data: [], message: "No Orders" };


test( 'Mocking the order response',async ({browser})=>{
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

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayLoadOrders);
      route.fulfill(
        {
          response,
          body,
 
        });
      //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
    });

    await page.locator('[routerlink*="myorders"]').click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");

})