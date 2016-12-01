const phantom = require('phantom');

(async function() {
    const instance = await phantom.create();
    const page1 = await instance.createPage();
    const page2 = await instance.createPage();

    page1.open('http://localhost:3000/slow').then(function() {
        console.log('slow done.');
        instance.exit();

    });


    page2.open('http://localhost:3000/fast').then(function() {
        console.log('fast done.');
    });

    console.log('waiting...')

}());

// node --harmony-async-await async.js
