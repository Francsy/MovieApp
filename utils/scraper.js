const puppeteer = require("puppeteer");

const getFACritics = async (title) => {
    try {
        const browser = await puppeteer.launch({ headless: true })
        const page = await browser.newPage();
        await page.goto(`https://www.filmaffinity.com/en/advsearch2.php?q=${title}`);
        await page.waitForSelector('.css-v43ltw');
        await page.click('.css-v43ltw')
        await page.waitForSelector('a.gs-title')
        const firstMovie = await page.$eval('a.gs-title', aMovie => aMovie.href);
        await page.goto(firstMovie);
        await page.waitForSelector('.pro-review div')
        const opinions = await page.evaluate(() => {
            const opinionsArray = [];
            const opinionsElements = document.querySelectorAll('.pro-review div');

            opinionsElements.forEach(opinion => {
                opinionsArray.push(opinion.innerText);
            });

            return opinionsArray;
        });
        await browser.close()
        return opinions
    } catch (err) {
        console.log(err)
    }
}


// A partir de la linea comentada no consigo seleccionar la peli
const getRTReview = async (title) => {
    try {
        const browser = await puppeteer.launch({ headless: true })
        const page = await browser.newPage();
        await page.goto(`https://www.rottentomatoes.com/search?search=${title}`);
        await page.waitForSelector('#onetrust-accept-btn-handler');
        await page.click('#onetrust-accept-btn-handler')
        await page.waitForSelector('li[class="js-search-filter searchNav__filter"][data-filter="movie"]');
    
        await page.click('li[class="js-search-filter searchNav__filter"][data-filter="movie"]')
        await page.waitForSelector('#search-results > search-page-result:nth-child(3) > ul > search-page-media-row > a:nth-child(2)')
        const firstResult = await page.$eval('#search-results > search-page-result:nth-child(3) > ul > search-page-media-row > a:nth-child(2)', result => result.href);
        await page.goto(firstResult)
        await page.waitForSelector('#audience_reviews > ul > li:nth-child(1) > div.mop-audience-reviews__review-quote > div.mop-audience-reviews__review--comment.clamp.clamp-4.js-clamp')
        const specialReview = await page.$eval('#audience_reviews > ul > li:nth-child(1) > div.mop-audience-reviews__review-quote > div.mop-audience-reviews__review--comment.clamp.clamp-4.js-clamp', result => result.innerHTML)
        return specialReview;   
    } catch (err) {
        console.log(err)
    }
}

// PRUEBAS
// getFACritics("Indiana Jones: Raiders of the Lost Ark").then(data => console.log(data))
// getRTReview("Star Wars Episode I").then(data => console.log(data))
// getIMDB("Indiana Jones: Raiders of the Lost Ark").then(data => console.log(data))


module.exports = {
    getFACritics,
    getRTReview
}


/* const getSensacineOpinion = async (title) => {
    try {
        const browser = await puppeteer.launch({headless:false})
        const page = await browser.newPage();
        await page.goto('https://www.sensacine.com/');
        console.log(`Navigating to Sensacine...`);
        await page.waitForSelector('#didomi-notice-agree-button');
        await page.click('#didomi-notice-agree-button');
        await page.click('#header-main-mobile-btn-search')
        await page.waitForSelector('#header-search-input');
        await page.type('#header-search-input', title);
        await page.keyboard.press('Enter');
        await page.waitForSelector('meta-title-link');

        await page.waitForSelector('.thumbnail-link');
        const firstMovie = await page.$eval('.thumbnail-link', aMovie => aMovie.href);
        await page.goto(firstMovie);

        await browser.close()
        return firstMovie



    } catch(err){
        console.log(err)
    }
} */


/*  
// Funciona con el headless false:
const getIMDB = async (title) => {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            ignoreHTTPSErrors: true,
            args: [`--window-size=1920,1080`],
            defaultViewport: {
                width: 1920,
                height: 1080
            }
        });
        const page = await browser.newPage();
        await page.goto(`https://www.imdb.com/`);
        // await page.waitForSelector('#nav-search-form');
        // await page.click('#nav-search-form');
        // await page.waitForSelector('#nav-search-form > div.sc-idXgbr.iHkrUj.searchform__inputContainer > div input');
        // await page.$eval('#nav-search-form > div.sc-idXgbr.iHkrUj.searchform__inputContainer > div input', input => input.value = title)
        await page.waitForSelector('#suggestion-search');
        await page.click('#suggestion-search');
        await page.type('#suggestion-search', title)
        await page.keyboard.press('Enter');
        await page.waitForSelector('.ipc-metadata-list-summary-item__t');
        const firstMovie = await page.$eval('.ipc-metadata-list-summary-item__t', aMovie => aMovie.href);
        await page.goto(firstMovie);
        await page.waitForSelector('section[data-testid="UserReviews"] > .sc-f65f65be-0.fVkLRr div .ipc-overflowText .ipc-html-content div')
        const opinion = await page.$eval('section[data-testid="UserReviews"] > .sc-f65f65be-0.fVkLRr div .ipc-overflowText .ipc-html-content div', opinionDiv => opinionDiv.innerText)
        // await browser.close()
        return opinion
    } catch (err) {
        console.log(err)
    }
}
*/
/* 
const getIMDB = async (title) => {
    try {
        // const browser = await puppeteer.launch({
        //     headless: true,
        //     ignoreHTTPSErrors: true,
        //     args: [`--window-size=1920,1080`],
        //     defaultViewport: {
        //         width: 1920,
        //         height: 1080
        //     }
        // });
        const browser = await puppeteer.launch({ headless: true })xw
        const page = await browser.newPage();
        await page.goto(`https://www.imdb.com/find/?q=${title}&ref_=nv_sr_sm`);
        // await page.waitForSelector('#nav-search-form');
        // await page.click('#nav-search-form');
        // await page.waitForSelector('#nav-search-form > div.sc-idXgbr.iHkrUj.searchform__inputContainer > div input');
        // await page.$eval('#nav-search-form > div.sc-idXgbr.iHkrUj.searchform__inputContainer > div input', input => input.value = title)
        // await page.waitForSelector('#suggestion-search');
        // await page.click('#suggestion-search');
        // await page.type('#suggestion-search', title)
        // await page.keyboard.press('Enter');
        await page.waitForSelector('.ipc-metadata-list-summary-item__t');
        const firstMovie = await page.$eval('.ipc-metadata-list-summary-item__t', aMovie => aMovie.href);
        await page.goto(firstMovie);
        await page.waitForSelector('section[data-testid="UserReviews"] > .sc-f65f65be-0.fVkLRr div .ipc-overflowText .ipc-html-content div')
        const opinion = await page.$eval('section[data-testid="UserReviews"] > .sc-f65f65be-0.fVkLRr div .ipc-overflowText .ipc-html-content div', opinionDiv => opinionDiv.innerText)
        // await browser.close()
        return opinion
    } catch (err) {
        console.log(err)
    }
} */