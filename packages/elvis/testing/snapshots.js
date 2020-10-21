const PercyScript = require('@percy/script');
const breakpoints = [766, 1440];

PercyScript.run(async (page, percySnapshot) => {
    await page.await(2000)
    await page.goto('http://localhost:3333/');
    await page.await(2000)

    //clicakble components
    await page.click('span[id="tooltip-top"]');
    await page.click('span[id="tooltip-bottom"]');
    // Homepage
    await percySnapshot('Stilbibliotek', { widths: breakpoints });

}); 