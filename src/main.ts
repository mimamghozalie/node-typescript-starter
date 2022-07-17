import puppeteer from "puppeteer";

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            "--disable-extensions"],
        defaultViewport: null,
        executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe"
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    await page.goto('https://faucet.polygon.technology/', {
        waitUntil: 'networkidle2',
    }).then(async () => {

        console.log('wait write address')
        await timeout(2000)
        await page.type("#app > div > div > div.index > div > div > div:nth-child(1) > div > div > div > div:nth-child(6) > div > div.d-flex.flex-column > div > input[type=text]", "0x7146e0D56Cb01736f3fdf032FF4DE983924Ec135")


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
        await browser.close()
    })


    // await setTimeout(async () => {

    // 

    // setTimeout(async () => {
    //     
    // }, 1000);

    // setTimeout(async () => {
    //     console.info("DONE")
    //     await page.screenshot({ path: 'example.png' });
    //     await browser.close()
    // }, 5000);
    // }, 4000);


})()

function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}