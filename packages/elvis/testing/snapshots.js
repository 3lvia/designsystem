const PercyScript = require('@percy/script');
const breakpoints = [766, 1440];

PercyScript.run(async (page, percySnapshot) => {
    await page.waitFor(2000)
    await page.goto('http://localhost:3333/');
    await page.waitFor(2000)
    // Homepage
    await percySnapshot('Stilbibliotek', { widths: breakpoints });

}); 