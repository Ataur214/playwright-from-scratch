const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObject/loginPage');
const {ProductPage} = require('../pageObject/productPage');
const { CartPage } = require('../pageObject/cartPage');
const { CheckoutPage } = require('../pageObject/checkOutPage');
const { MyOrderPage } = require('../pageObject/myOrderPage');
const data = JSON.parse(JSON.stringify(require('../resources/userdetails.json')));

test('E2E test for product checkout ', async ({ page }) => {
    
    const successMessage = page.locator('.hero-primary');
   
    const loginPage = new LoginPage(page,expect);
    await loginPage.goTo();
    await expect(page).toHaveTitle("Let's Shop");

    await loginPage.validLogin(data.userEmail,data.userPassword);
   
    //add product to my shopping cart
    const productPage = new ProductPage(page)
    await productPage.addToCard(data.productName);

    //Assert the card details dynamically
    const cartpage = new CartPage(page);
    await cartpage.navigateToMyCart();
    await cartpage.checkMyCartDetails(data.productName);

    //Fill up the order details
    const checkoutpage = new CheckoutPage(page);
    await checkoutpage.navigateToCheckOutDetails();
    await checkoutpage.inputDetailsToCheckOut(data.Cvv,data.cardName,data.CountryName,data.userEmail);
    await checkoutpage.clickPlaceOrderButton();
    
    // after place order assert some cases
    await expect(successMessage).toHaveText(' Thankyou for the order. ');
    const orderIDWithSpace = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    console.log(orderIDWithSpace);
    const splitID = orderIDWithSpace.split(" ");
    const orderID = splitID[2];
    console.log(orderID);

    // navigate to my order Tab and assert the order id dynamically
    const myOrderList = new MyOrderPage(page);
    await myOrderList.navigateToMyOrderTab();
    await myOrderList.findMyOrderID(orderID);

    await page.pause();
    
})