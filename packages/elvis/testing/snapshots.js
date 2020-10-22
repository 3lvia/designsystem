const PercyScript = require('@percy/script');
const breakpoints = [766, 1440];

PercyScript.run(async (page, percySnapshot) => {
    await page.waitForTimeout(2000)
    await page.goto('http://localhost:3333/');
    await page.waitForTimeout(2000)

    //Accordion
    await page.goto('http://localhost:3333/components/accordion.html');
    await percySnapshot('Accordion', { widths: breakpoints });
    //Alerts
    await page.goto('http://localhost:3333/components/alerts.html');
    await percySnapshot('Alerts', { widths: breakpoints });
    //Buttons
    await page.goto('http://localhost:3333/components/buttons.html');
    await percySnapshot('Buttons', { widths: breakpoints });
}); 