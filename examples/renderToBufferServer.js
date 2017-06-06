const phantom = require('phantom');
const express = require('express');
const now = require("performance-now")

startServer();

async function startServer(){
    const app = express();
    const instance = await phantom.create();

    app.listen(4444, () => console.log('PDF-Service running at http://localhost:4444/'));

    app.get('/', (req, res) => {
        (async function(){
            console.log('PDF requested...')
            const start = now();

            // setup page
            const page = await instance.createPage();
            await page.property('viewportSize', {width: 1024, height: 600});
            await page.property('content', '<html><body>Hello World!</body></html>');

            // render to buffer
            const buffer = await page.render('/dev/stdout/', { format: 'pdf'});

            // delivery
            res.set('Content-type', 'application/pdf');
            res.set('Content-disposition', 'inline; filename="agreement.pdf"');
            res.send(buffer);

            // benchmark
            console.log(`Delivered in ${(now() - start).toFixed(3)}ms`);
        })()
    })
}

// node --harmony-async-await phantom.js

