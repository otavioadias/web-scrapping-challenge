import puppeteer from "puppeteer";
import fs from "fs";

const url = "https://webscraper.io/test-sites/e-commerce/allinone/computers/laptops";
const lenovoLaptops = [];

const getLenovoLaptops = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log('Iniciou');

    await page.goto(url);
    console.log('Entrou na URL');

    await page.waitForSelector('.col-sm-4 > .thumbnail');
    console.log('Esperou');

    const links = await page.$$eval(
        '.col-sm-4 > .thumbnail > .caption > h4 > a',
        el => el.map((link) => {
            if (link.title.includes('Lenovo')) return link.href
        }).filter(link => link)
    );

    for(const link of links) {
        await page.goto(link);
        await page.waitForSelector('.col-md-9');

        const title = await page.$eval('.caption > h4:nth-of-type(2)', element => element.innerText);
        const price = await page.$eval('.caption > .pull-right', element => element.innerText.replace(/[^\d.-]/g, ''));
        const description = await page.$eval('.description', element => element.innerText);
        const memory = await page.$eval('.memory', element => element.innerText);
        const swatches = await page.$eval('.swatches', element => element.innerText);
        const ratings = await page.$eval('.ratings p', element => element.innerText);
        const stars = await page.$$eval('.ratings span', spans => spans.length);

        const obj = {
            title,
            price: Number(price),
            description,
            memory,
            swatches,
            ratings,
            stars,
        };

        lenovoLaptops.push(obj);
    }

    const lenovoLaptopsSort = lenovoLaptops.sort((a, b) => a.price - b.price);

    fs.writeFile('lenovoLaptops.json', JSON.stringify(lenovoLaptopsSort, null, 2), err => {
        if(err) throw new Error('Something went wrong');

        console.log('Ok');
    });

    await browser.close();
};

getLenovoLaptops();

export default getLenovoLaptops;