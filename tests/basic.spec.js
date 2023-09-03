const {test, expect} = require('@playwright/test');

test.describe.only('Two complete flow', ()=>{

    test('open the browser', async ({browser})=>{
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://rahulshettyacademy.com/locatorspractice/');
        console.log(await page.title());
    });

    test('User registration form',async ({page})=>{
        await page.goto('https://rahulshettyacademy.com/client');
        await expect(page).toHaveTitle("Let's Shop");
    
        const firstName = page.locator('#firstName');
        const lastName = page.locator('#lastName');
        const gmail = page.locator("#userEmail");
        const mobile = page.locator('#userMobile');
        const dropdown = page.locator('[formcontrolname=occupation]');
        const reg = page.getByText('Register here');
        const Gender = page.getByLabel('Male', { exact: true });
        const pass = page.getByPlaceholder('Passsword', { exact: true });
        const confirmPass = page.getByPlaceholder('Confirm Passsword');
        const chceckBox = page.getByRole('checkbox');
        const regButton  = page.getByRole('button', { name: 'Register' });
    
        await reg.click();
        await firstName.type('Ataure');
        await lastName.type('Rahaman');
        await gmail.type('noiceataure@gmail.com');
        await mobile.type('1799797447');
        await dropdown.selectOption('3: Engineer');
        await Gender.click();
        await pass.type('@Ata1234');
        await confirmPass.type('@Ata1234');
        await chceckBox.click();
        await regButton.click();
    
        //await page.pause();
    
    })

})

test('without context open the browser', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');

    const userName = page.locator('#username');
    const password = page.locator('[type=password]');
    const signButton = page.locator('#signInBtn');
    const errorText = page.locator('[style*=block]');
    const productTitle = page.locator('app-card a');
    const radioButton = page.locator('input#usertype');
    const dropdown = page.locator('select.form-control');
    const okayButton = page.locator('#okayBtn');
    const blinkText = page.locator('[href*="documents-request"]');

    await userName.type('rahulshettyacadem');
    await password.type('learning');

    await signButton.click();
    const errorMessage = await errorText.textContent();
    console.log(errorMessage);
    await expect(errorText).toHaveText('Incorrect username/password.');

    await userName.clear();
    await userName.fill('rahulshettyacademy');
    await radioButton.last().click();
    await okayButton.click();
    await expect(radioButton.last()).toBeChecked();
    await dropdown.selectOption('consult');
    //await page.pause();
    await expect(blinkText).toHaveAttribute('class','blinkingText');

    await signButton.click();
    //console.log(await productTitle.nth(1).textContent());
    await productTitle.first().waitFor();
    const allTitle = await productTitle.allTextContents();
    console.log(allTitle);
    
});



test('window handle', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    const blinkText = page.locator('[href*="documents-request"]');
    //const gmail = page.locator('[href*="mailto:mentor"]');
    const userName = page.locator('#username');

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        blinkText.click(),
    ])
    
    const text = await newPage.locator('[href*="mailto:mentor"]').textContent();
    await console.log(text);

    await userName.type(text);

})

test('codegen record and playback', async ({ page }) => {
  await page.goto('https://flightexpert.com/');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByPlaceholder('Enter email address').click();
  await page.getByPlaceholder('Enter email address').fill('test@gmail.com');
  await page.getByPlaceholder('Enter password').click();
  await page.getByPlaceholder('Enter password').fill('123456');
  await page.getByLabel('Close').click();
  await page.frameLocator('[data-testid="dialog_iframe"]').getByLabel('close').click();
  await page.getByLabel('Round Trip').check();
  await page.locator('#submit_btn').click();
  await page.getByRole('button', { name: 'Try Another Search?' }).click();
});