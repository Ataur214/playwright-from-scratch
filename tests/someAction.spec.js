const {test,expect} = require('@playwright/test');

test('Browser back/forward action', async ({page})=>{
    await page.goto('https://www.google.com/');
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await page.goBack();
    await page.goForward();

    await expect (page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();

    //alert dialogs in playwright 
    await page.locator('#confirmbtn').click();
    
    page.on('dialog',dialog =>dialog.accept());

    //hover on the item
    await page.locator('#mousehover').hover();
    await page.getByRole('link',{name:'Reload'}).click();
    
   
    //iFrame handle
    const frame = page.frameLocator("#courses-iframe");
    const ele = frame.getByRole('link',{name: 'Blog'});
    await ele.waitFor();
    //await elementHandle.scrollIntoViewIfNeeded();
    //await frame.getByRole('link',{name: 'Blog'}).scrollIntoViewIfNeeded();
    await frame.getByRole('link',{name: 'Blog'}).click();

})