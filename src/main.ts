import puppeteer from "puppeteer";
declare let window: any

const mumbaiFaucet = async (address: string) => {
    const browser = await puppeteer.launch({
        headless: "chrome",
        args: [
            "--disable-extensions"],
        defaultViewport: null,
        executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe"
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    await page.goto('https://faucet.polygon.technology/', {
        waitUntil: 'networkidle2',
    })

    console.log('wait write address')
    await timeout(2000)
    await page.type("#app > div > div > div.index > div > div > div:nth-child(1) > div > div > div > div:nth-child(6) > div > div.d-flex.flex-column > div > input[type=text]", address)


    console.log('wait address validation')
    await timeout(2000)
    await page.click("#app > div > div > div.index > div > div > div:nth-child(1) > div > div > div > div:nth-child(7) > div > div > button")

    console.log('wait claim faucet')
    await timeout(2000)
    await page.click("#app > div > div > div.index > div > div > div:nth-child(1) > div > div.section.position-absolute > div.modal.show > div > div > div:nth-child(2) > div.ps-t-12 > div > button")


    console.log('wait take screenshoot')
    await timeout(2000)
    await page.screenshot({ path: 'example.png' });


    console.log('wait close browser')
    await timeout(2000)
    const found = await page.evaluate(() => window.find("The transfer is on the way. Tokens will be transferred to you in 1-2 minutes."));
    await browser.close()


    return {
        success: found ? true : false
    }
}

function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

mumbaiFaucet("0xdc6999513539883ee37f4f1a0a2Ad573812B6A68")
    .then(status => {
        console.log('Faucet status = ', status)
    })