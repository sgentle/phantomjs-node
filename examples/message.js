var phantom = require("../lib");
var _ph, _page, _outObj;

phantom.create().then(ph => {
    _ph = ph;
    return _ph.createPage();
}).then(page => {
    _page = page;
    _ph.onMessage(function(resourceUrl) {
    	console.log('Node context received resourceUrl: ', resourceUrl);
    });
    _page.property('onResourceRequested', function(resource, networkRequest, callbackMessagePrefix) {
    	console.log(callbackMessagePrefix + resource.url);
    }, _ph.getCallbackMessagePrefix());
    return _page.open('https://stackoverflow.com/');
}).then(status => {
    console.log(status);
    return _page.property('content')
}).then(content => {
    _page.close();
    _ph.exit();
});