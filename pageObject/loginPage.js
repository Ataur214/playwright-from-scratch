class LoginPage{

    constructor(page,expect){
        this.page = page;
        this.expect = expect;
        this.loginEmail = page.locator('#userEmail');
        this.userPass = page.locator('#userPassword');
        this.loginButton = page.locator('#login');
        this.loginPageTitle = page.locator('h3+p');
        this.products = page.locator('.card-body');

    }

    async goTo(){
        await this.page.goto('https://rahulshettyacademy.com/client');
    }

    async validLogin(userEmail,userPassword){
        await this.loginEmail.type(userEmail)
        await this.userPass.type(userPassword);
        await this.loginButton.click();
        await this.expect(this.loginPageTitle).toHaveText("Automation Practice");
        await this.products.first().waitFor();
    }

}
module.exports = {LoginPage};