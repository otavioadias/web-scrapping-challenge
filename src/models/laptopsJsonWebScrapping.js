import puppeteer from "puppeteer";
import * as dotenv from 'dotenv';

dotenv.config();

const getLenovoLaptops = async () => {
    const lenovoLaptops = [];
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(process.env.URL_LAPTOPS);

    await page.waitForSelector('.col-sm-4 > .thumbnail');

    const links = await page.$$eval(
        '.col-sm-4 > .thumbnail > .caption > h4 > a',
        el => el.map((link) => {
            if (link.title.includes('Lenovo')) return link.href
        }).filter(link => link)
    );

    for(const link of links) {
        await page.goto(link);
        await page.waitForSelector('.col-md-9');

        const [title, price, description, memory, swatches, ratings, stars] = await Promise.all([
            page.$eval('.caption > h4:nth-of-type(2)', element => element.innerText),
            page.$eval('.caption > .pull-right', element => element.innerText.replace(/[^\d.-]/g, '')),
            page.$eval('.description', element => element.innerText),
            page.$eval('.memory', element => element.innerText),
            page.$eval('.swatches', element => element.innerText),
            page.$eval('.ratings p', element => element.innerText),
            page.$$eval('.ratings span', spans => spans.length)
        ]);

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

    // fs.writeFile('lenovoLaptops.json', JSON.stringify(lenovoLaptopsSort, null, 2), err => {
    //     if(err) throw new Error('Something went wrong');
    // });

    await browser.close();
    return lenovoLaptopsSort;
};

export default getLenovoLaptops;