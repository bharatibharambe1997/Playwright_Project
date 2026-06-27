const { expect } = require(`@playwright/test`);
const path = require('path');

class BasePage {
    constructor(page) {
        this.page = page;
    }

    //Resolve file path from filename (Centralized file path)

    getFilePath(fileName, folder = 'testData') {

        if(!fileName) {
            throw new Error('File name is required');
        }

        return path.resolve(folder, fileName);
    }

    //Highlight element on the page(for debugging purpose + visual feedback)

    async highlight(locactor) {
        await locator.waitFor({ state: 'visible' });
        await locator.evaluate((el) => {
            el.style.transition = 'box-shadow 0.3s ease-in-out';
            el.style.outline = '3px solid red';
            el.style.backgroundColor = 'yellow';

        });
        await this.page.waitForTimeout(1000); // Wait for 1 second to visualize the highlight
        await locator.evaluate((el) => {
            el.style.outline = '';
            el.style.backgroundColor = '';
        });
    }
    //Fill Input Field
    async fill(locator, value) {
        await this.highlight(locator);
        await locator.waitFor({ state: 'visible' });
        await locator.fill('');
        await locator.fill(value);
    }

    //Click on Element
    async click(locator) {
        await this.highlight(locator);
        await locator.waitFor({ state: 'visible' });
        await locator.click();
    }

    //Press Key
    async press(locator, key) {
        await this.highlight(locator);
        await locator.waitFor({ state: 'visible' });
        await locator.press(key);
    }

    //Expect Element to be Visible
    async expectVisible(locator) {
        await this.highlight(locator);
        await expect(locator).toBeVisible();
    }

    //Expect value of the element
    async expectToHaveValue(locator, value) {
        await this.highlight(locator);
        await expect(locator).toHaveValue(value);
    }

    //Generic file upload method(reusable everywhere)
    async uploadFile(locator, fileName, folder = 'data\\upload-files') {
        const filePath = this.getFilePath(fileName, folder);
        await this.highlight(locator);
        await expct(locator).toBeVisible();
        await locator.setInputFiles(filePath);
        console.log(`Uploaded file: "${filePath}" from "${folder}"`);
    }
}module.exports = BasePage;


    