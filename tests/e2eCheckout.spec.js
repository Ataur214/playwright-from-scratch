const { test, expect } = require('@playwright/test');

test('login to the portal', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client');
    await expect(page).toHaveTitle("Let's Shop");

    const email = 'noiceataure@gmail.com';
    const loginEmail = page.locator('#userEmail');
    const userPass = page.locator('#userPassword');
    const loginButton = page.locator('#login');
    const loginPageTitle = page.locator('h3+p');
    const products = page.locator('.card-body');
    const productName = 'adidas original';
    //const addToCard = getByRole('button', { name: ' Add To Cart' });
    const myCard = page.locator('[routerlink="/dashboard/cart"]');
    const myCardList = page.locator('.cart h3');
    const checkout = page.getByRole('button',{name:'checkout'});
    const CVV = page.locator('input[type="text"]').nth(1);
    const cardName = page.locator('input[type="text"]').nth(2);
    const Country = page.locator('input[placeholder="Select Country"]');
    const dropDownList = page.locator('section.ta-results');
    const shoppingPageEmail = page.locator('.user__name [type=text]');
    const placeOrderButton = page.locator('.action__submit');
    const successMessage = page.locator('.hero-primary');
    const orderTab = page.locator('[routerlink*="myorders"]');
    const orderIdList = page.locator('tbody tr');


    await loginEmail.type(email);
    await userPass.type('@Ata1234');
    await loginButton.click();
    //const homeTitle = await loginPageTitle.textContent();
    await expect(loginPageTitle).toHaveText("Automation Practice");
    await products.first().waitFor();
    //const count = await products.count();

    //Add the product to my card dynamically
    for (let i = 0; i <await products.count(); i++) {
        if (await products.nth(i).locator('b').textContent() == productName) {
            await products.nth(i).getByRole('button', { name: ' Add To Cart' }).click();
            break;
        }
    }
    await myCard.click();

    //Assert the card details dynamically
    await myCardList.first().waitFor();

    for(let i = 0; i<await myCardList.count(); i++){
        if(await myCardList.nth(i).textContent() == productName){
            await expect(myCardList.nth(i)).toHaveText(productName);
            console.log(await myCardList.nth(i).textContent());
        }
    }

    //Fill up the order details
    await checkout.click();
    await CVV.type('1234');
    await cardName.type('ataure')
    await Country.type('ind',{delay:100});

    await expect(shoppingPageEmail.first()).toHaveText(email);

    //Select country from dropdown list dynamically
    await dropDownList.waitFor();
    const dropDownValue = await dropDownList.locator('button').count();
    for(let i = 0; i<dropDownValue; i++){
        if(await dropDownList.locator('button').nth(i).textContent() === " India"){
            await dropDownList.locator('button').nth(i).click();
            break;
        }
    }

    // after place order assert some cases
    await placeOrderButton.click();
    await expect(successMessage).toHaveText(' Thankyou for the order. ');
    const orderIDWithSpace = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    console.log(orderIDWithSpace);
    const splitID = orderIDWithSpace.split(" ");
    const orderID = splitID[2];
    console.log(orderID);

    // navigate to my order Tab and assert the order id dynamically
    await orderTab.first().click();
    await orderIdList.first().waitFor();
    for(let i = 0; i<await orderIdList.count(); i++){
        if(await orderIdList.nth(i).locator('th[scope="row"]').textContent() == orderID){
            await orderIdList.nth(i).locator('td button.btn-primary').click();
            await page.pause();
        }
    }
    
})