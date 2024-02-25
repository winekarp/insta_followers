const assert = require('assert');

export class ElementHelper {
    static timeout = browser.config.waitforTimeout;

    static async waitForClickable(element: WebdriverIO.Element, option = {
        timeout: ElementHelper.timeout,
        reverse: false,
        interval: 100
    }): Promise<boolean> {
        return element.waitForClickable(option);
    }

    static async waitForDisplayed(element, customTimeout?, element_name?, option = {
        timeout: ElementHelper.timeout,
        reverse: false,
        interval: 100
    }) {
        if (typeof customTimeout !== 'undefined') {
            option.timeout = customTimeout; // Use custom timeout if provided
        } else if (typeof option.timeout === 'undefined') {
            option.timeout = ElementHelper.timeout; // Use default timeout from ElementHelper if not provided
        }

        const start = Date.now();
        let isDisplayed = false;

        while (Date.now() - start < option.timeout) {
            try {
                isDisplayed = await (element).isDisplayed();
                if (isDisplayed) {
                    return true;
                }
            } catch (error) {
                // additional error handler
            }

            // Sleep for a short interval
            await new Promise(resolve => setTimeout(resolve, option.interval));
        }

        if (!isDisplayed) {
            if (element_name) {
                throw new Error(`Element with name '${element_name}' was not displayed`);
            } else {
                throw new Error(`Required element was not displayed. Check logs and screenshot`);
            }
        }
    }

    static async waitForExist(element: WebdriverIO.Element, option = {
        timeout: ElementHelper.timeout,
        reverse: false,
        interval: 100
    }): Promise<boolean> {
        return element.waitForExist(option);
    }

    static async getText(element: WebdriverIO.Element): Promise<string> {
        await ElementHelper.waitForDisplayed(element);
        return element.getText();
    }

    static async getValue(element: WebdriverIO.Element): Promise<string> {
        await ElementHelper.waitForDisplayed(element);
        return element.getValue();
    }

    static async clearField(element: WebdriverIO.Element): Promise<void> {
        return element.clearValue();
    }

    static async sendKeys(element: WebdriverIO.Element, value): Promise<boolean> {
        try {
            await ElementHelper.waitForClickable(element);
            await element.setValue(value);
            return ElementHelper.isPageReady();
        } catch (e) {
            console.error('Element for sends is not present');
            console.error(e);
        }
    }

    static async setValue(element: WebdriverIO.Element, value): Promise<boolean> {
        try {
            await ElementHelper.waitForClickable(element);
            await ElementHelper.click(element);
            await ElementHelper.removeValue(element);

            await element.setValue(value);
            return ElementHelper.isPageReady();
        } catch (e) {
            console.error('Element for sends is not present');
            console.error(e);
        }
    }

    static async removeValue(element: WebdriverIO.Element): Promise<void> {
        await browser.keys(['Control', 'a']);
        await browser.keys(['Backspace']);
        await browser.keys(['Backspace']);
        await browser.keys(['Backspace']);
    }

    static async typeValue(element: WebdriverIO.Element, value): Promise<boolean> {
        try {
            await ElementHelper.waitForClickable(element);
            await ElementHelper.click(element);
            await ElementHelper.removeValue(element);

            await browser.keys(value)
        } catch (e) {
            console.error('Element for sends is not present');
            console.error(e);
        }
    }

    static async deleteValue(element: WebdriverIO.Element): Promise<boolean> {
        try {
            await ElementHelper.waitForClickable(element);
            await ElementHelper.click(element);
            await ElementHelper.removeValue(element);
            await browser.pause(1000);

            return ElementHelper.isPageReady();
        } catch (e) {
            console.error('Element for sends is not present');
            console.error(e);
        }
    }

    static async click(element: WebdriverIO.Element, parameters?: any): Promise<boolean> {
        try {
            await ElementHelper.waitForClickable(element);
            await (parameters ? element.click(parameters) : element.click());
            return ElementHelper.isPageReady();
        } catch (e) {
            console.error('Element for click is not present');
            console.error(e);
        }
    }

    static async hover(element: WebdriverIO.Element): Promise<boolean> {
        try {
            await ElementHelper.waitForDisplayed(element);
            await element.moveTo();
            return ElementHelper.isPageReady();
        } catch (e) {
            console.error('Element for click is not present');
            console.error(e);
        }
    }

    static async isPageReady() {
        // @ts-ignore
        return browser.waitUntil(async () => {
            const state = await browser.execute(function () {
                return document.readyState;
            });
            return state === 'complete';
        }, {
            timeout: ElementHelper.timeout,
            timeoutMsg: 'Oops, time out!',
            interval: 100
        }
        );
    }

    static async retry_function(fn) {
        const maxAttempts = 3;
        const retryInterval = 5000; // 5 seconds in milliseconds

        let lastError;

        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                // Call the provided function
                await fn();

                // If the function succeeds, break out of the loop
                return; // Success, exit the function
            } catch (error) {
                console.error(`Attempt ${attempt} failed: ${error.message}`);

                // Save the last error for reference
                lastError = error;

                // Wait for the specified interval before the next attempt
                await new Promise(resolve => setTimeout(resolve, retryInterval));
            }
        }

        // If all attempts fail, throw the last error
        throw lastError;
    }
}
