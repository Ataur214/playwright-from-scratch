class MyOrderPage {
    constructor(page) {
        this.orderTab = page.locator('[routerlink*="myorders"]');
        this.orderIdList = page.locator('tbody tr');

    }

    async navigateToMyOrderTab() {
        await this.orderTab.first().click();
    }

    async findMyOrderID(orderID) {
        await this.orderIdList.first().waitFor();
        for (let i = 0; i < await this.orderIdList.count(); i++) {
            if (await this.orderIdList.nth(i).locator('th[scope="row"]').textContent() == orderID) {
                await this.orderIdList.nth(i).locator('td button.btn-primary').click();
            }
        }

    }
}
module.exports = { MyOrderPage }