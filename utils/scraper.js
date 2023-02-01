const puppeteer = require("puppeteer");

// const getSensacineOpinion = async (title) => {
//     try {
//         const browser = await puppeteer.launch({headless:false})
//         const page = await browser.newPage();
//         await page.goto('https://www.sensacine.com/');
//         console.log(`Navigating to Sensacine...`);
//         await page.waitForSelector('#didomi-notice-agree-button');
//         await page.click('#didomi-notice-agree-button');
//         await page.click('#header-main-mobile-btn-search')
//         await page.waitForSelector('#header-search-input');
//         await page.type('#header-search-input', title);
//         await page.keyboard.press('Enter');
//         await page.waitForSelector('meta-title-link');
        
//         await page.waitForSelector('.thumbnail-link');
//         const firstMovie = await page.$eval('.thumbnail-link', aMovie => aMovie.href);
//         await page.goto(firstMovie);

//         await browser.close()
//         return firstMovie
        


//     } catch(err){
//         console.log(err)
//     }
// }

const getFilmAffinity = async (title) => {
    try {
        const browser = await puppeteer.launch({headless:false})
        const page = await browser.newPage();
        await page.goto('https://www.filmaffinity.com/en/main.html');

        
    } catch (err) {
        console.log(err)
    }
}

getSensacineOpinion("Indiana Jones and the last").then(data =>console.log(data))
