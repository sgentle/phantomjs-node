const phantom = require('phantom');
const fs = require('fs');

(async function() {
    const instance = await phantom.create();
    const page = await instance.createPage();
    await page.property('viewportSize', {width: 1024, height: 600});
    await page.property('content', '<html><body>Hello World!</body></html>');

    // render to buffer
    const buffer = await page.render('/dev/stdout/', { format: 'pdf'});
    fs.writeFileSync('noNeedForTempFilesAnymore.pdf', buffer);

    await instance.exit();
})();

// node --harmony-async-await phantom.js


