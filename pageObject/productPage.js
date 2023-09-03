class ProductPage{
    constructor(page){
        this.products = page.locator('.card-body');

    }

    async addToCard(productName){

        for (let i = 0; i <await this.products.count(); i++) {
            if (await this.products.nth(i).locator('b').textContent() == productName) {
                await this.products.nth(i).getByRole('button', { name: ' Add To Cart' }).click();
                break;
            }
        }
    }
}
module.exports = {ProductPage}