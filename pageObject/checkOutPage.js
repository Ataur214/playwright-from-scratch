const {test , expect} = require('@playwright/test')
class CheckoutPage {
    constructor(page) {
        this.checkout = page.getByRole('button', { name: 'checkout' });
        this.CVV = page.locator('input[type="text"]').nth(1);
        this.CardName = page.locator('input[type="text"]').nth(2);
        this.Country = page.locator('input[placeholder="Select Country"]');
        this.dropDownList = page.locator('section.ta-results');
        this.shoppingPageEmail = page.locator('.user__name [type=text]');
        this.placeOrderButton = page.locator('.action__submit');
    }

    async navigateToCheckOutDetails() {
        await this.checkout.click();
    }

    async inputDetailsToCheckOut(Cvv, cardName, CountryName, userEmail) {
        await this.CVV.type(Cvv);
        await this.CardName.type(cardName);
        await this.Country.type(CountryName, { delay: 100 });

        await expect(this.shoppingPageEmail.first()).toHaveText(userEmail);

        //Select country from dropdown list dynamically
        await this.dropDownList.waitFor();
        const dropDownValue = await this.dropDownList.locator('button').count();
        for (let i = 0; i < dropDownValue; i++) {
            if (await this.dropDownList.locator('button').nth(i).textContent() === " India") {
                await this.dropDownList.locator('button').nth(i).click();
                break;
            }
        }
    }

    async clickPlaceOrderButton(){
        await this.placeOrderButton.click();
    }

}
module.exports = { CheckoutPage };