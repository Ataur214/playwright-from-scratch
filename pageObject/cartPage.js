const {test,expect} = require('@playwright/test');
class CartPage{
    constructor(page){
        this.myCardList = page.locator('.cart h3');
        this.myCard = page.locator('[routerlink="/dashboard/cart"]');

    }

    async navigateToMyCart(){
        await this.myCard.click();
    }

    async checkMyCartDetails(productName){
        await this.myCardList.first().waitFor();

        for(let i = 0; i<await this.myCardList.count(); i++){
            if(await this.myCardList.nth(i).textContent() == productName){
                await expect(this.myCardList.nth(i)).toHaveText(productName);
                console.log(await this.myCardList.nth(i).textContent());
            }
        }
    } 

}
module.exports = {CartPage}