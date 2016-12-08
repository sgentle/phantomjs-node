const Phantom = require('phantom');

let phantom;

Phantom.create().then(function(instance) {
    phantom = instance;
    return Promise.all([phantom.createPage(), phantom.createPage()]);
}).then(function(pages) {
    pages[0].open('http://localhost:3000/slow').then(function() {console.log('slow')});
    pages[1].open('http://localhost:3000/fast').then(function() {console.log('fast')});
}).then(function() {
    phantom.exit();
});
