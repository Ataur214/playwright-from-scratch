const {test} = require('@playwright/test');

test('@web Cypress inbuild locator strategic', async({page})=>{
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.locator('form input[name="name"]').type('Ataure');
    await page.locator('input[name="email"]').type('ataure@gmail.com');

    await page.getByPlaceholder('Password').type('123456');
    await page.getByLabel('Check me out if you Love IceCreams!').click();

    await page.getByLabel('Gender').selectOption('Female');
    await page.getByText('Employed').click();
    await page.getByRole('button',{name:'Submit'}).click();
    await page.getByRole('link',{name:'Shop'}).click();
    await page.locator('app-card').filter({hasText:'Nokia Edge'}).getByRole('button').click();

});