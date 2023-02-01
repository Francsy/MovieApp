const puppeteer = require("puppeteer");

const getFilmAffinity = async (title) => {
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
        const opinion = await page.$eval('.pro-review div', opinionDiv => opinionDiv.innerText)
        await browser.close()
        return opinion
    } catch (err) {
        console.log(err)
    }
}

// Funciona con el headless false:
const getIMDB = async (title) => {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage();
    await page.goto(`https://www.imdb.com/`);
    await page.waitForSelector('.imdb-header-search__input')
    await page.click('.imdb-header-search__input');
    await page.type('#suggestion-search', title)
    await page.keyboard.press('Enter');
    await page.waitForSelector('.ipc-metadata-list-summary-item__t');
    const firstMovie = await page.$eval('.ipc-metadata-list-summary-item__t', aMovie => aMovie.href);
    await page.goto(firstMovie);
    await page.waitForSelector('section[data-testid="UserReviews"] > .sc-f65f65be-0.fVkLRr div .ipc-overflowText .ipc-html-content div')
    const opinion = await page.$eval('section[data-testid="UserReviews"] > .sc-f65f65be-0.fVkLRr div .ipc-overflowText .ipc-html-content div', opinionDiv => opinionDiv.innerText)
    await browser.close()
    return opinion
}


// A partir de la linea comentada no consigo seleccionar la peli
const getRottenTomatoes = async (title) => {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage();
    await page.goto(`https://www.rottentomatoes.com/search?search=${title}`);
    await page.waitForSelector('#onetrust-accept-btn-handler');
    await page.click('#onetrust-accept-btn-handler')
    await page.waitForSelector('li[class="js-search-filter searchNav__filter"][data-filter="movie"]');

    await page.click('li[class="js-search-filter searchNav__filter"][data-filter="movie"]')
    // await page.waitForSelector('a[class="unset"][data-qa="info-name"]')
    // const firstResult = await page.$eval('a[class="unset"][data-qa="info-name"]', result => result.href);
    // await page.goto(firstResult)
}


// PRUEBAS
// getFilmAffinity("Indiana Jones: Raiders of the Lost Ark").then(data => console.log(data))
// getRottenTomatoes("Indiana Jones: Raiders of the Lost Ark").then(data => console.log(data))
getIMDB("Indiana Jones: Raiders of the Lost Ark").then(data => console.log(data))




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