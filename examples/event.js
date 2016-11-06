/*
* How to run this example
*
*   cd examples
*   npm install
*   node event.js
*
*/

var phantom = require('phantom');
var _ph, _page;
var _outObj;
var url, requestStatus, arrayLength;
var TIMEOUT = 6000;
url = "http://stackoverflow.com";
console.log("Get URL: " + url);
phantom.create().then(function(ph) {
  _ph = ph;
  return _ph.createPage();
}).then(function(page) {
  _page = page;
  // This website will tell you your current User Agent string if you want to update below:
  //   https://techblog.willshouse.com/2012/01/03/most-common-user-agents/
  var userAgentString = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36";
  var customHeaders = {
    'Pragma': 'blazeio-trace, akamai-x-get-extracted-values, akamai-x-get-cache-key, akamai-x-cache-on, akamai-x-feo-trace, akamai-x-cache-remote-on, akamai-x-flush-log, akamai-x-get-request-id',
    'x-ldebug': '1',
    'Accept-Language': 'en-US,en;q=0.8',
    //'Accept-Encoding':'gzip, deflate, sdch',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
  };
  _page.setting('userAgent', userAgentString);
  _page.setting('customHeaders', customHeaders);
  _page.setting('resourceTimeout', TIMEOUT);
  _page.setting('loadImages', true);
  _page.setting('javascriptEnabled', true);
  _page.setting('webSecurityEnabled', false);
  _page.property('onInitialized').then(function () {
    console.log("initialized request");
    page.setting('customHeaders', {});
  });
  _page.property('viewportSize', {width: 800, height: 600});
  _outObj = _ph.createOutObject();
  _outObj.urls_aborted = [];
  _outObj.urls_requested = [];
  _outObj.urls = [];
  _page.property('onResourceRequested', function (requestData, networkRequest, out) {
    out.isMatch = (/https?:\/\/.+?\.(:?png|gif|jpeg|jpg|svg|swf|css|woff|ttf)/gi).test(requestData.url);
    var responseObj = {};
    responseObj.id = requestData.id;
    responseObj.url = requestData.url;
    responseObj.status = requestData.status;
    responseObj.time = requestData.time;
    if (out.isMatch) {
      responseObj.status = 'aborted';
      out.urls_aborted.push(responseObj);
      networkRequest.abort();
    } else {
      responseObj.status = 'requested';
      out.urls_requested.push(responseObj);
    }
    out.urls.push(responseObj);
  }, _outObj);
  return _page.open(url);
}).then(function(status) {
  requestStatus = status;
  console.log("primary request status: " + requestStatus);
  return _outObj.property('urls');
}).then(function(requestsArray) {
  arrayLength = requestsArray.length;
  console.log("\nNUM Domains: " + arrayLength + "\n");
  var request;
  for (var i = 0; i < arrayLength; i++) {
    request = requestsArray[i];
    console.log("Domains " + i + " => " + request.url + " " + request.status);
  }
  return _outObj.property('urls_aborted');
}).then(function(abortedArray) {
  arrayLength = abortedArray.length;
  console.log("\nNUM aborted: " + arrayLength + "\n");
  var request;
  for (var i = 0; i < arrayLength; i++) {
    request = abortedArray[i];
    console.log("URL ABORT " + i + " => " + request.url + " " + request.status);
  }
  return _outObj.property('urls_requested');
}).then(function(requestedArray) {
  arrayLength = requestedArray.length;
  console.log("\nNUM requested: " + arrayLength + "\n");
  var request;
  for (var i = 0; i < arrayLength; i++) {
    request = requestedArray[i];
    console.log("URL REQ  " + i + " => " + request.url + " " + request.status);
  }
  return _page;
}).then(function(page) {
  _page = page;
  console.log("LOL. Anybody want a peanut?");
  return _page;
}).then(function(page) {
  _page = page;
  console.log("Next.  This does nothing!");
  return _page;
}).then(function(page) {
  console.log("Closing the page and exit the phantom.");
  page.close();
  _ph.exit();
}).catch(function(error) {
  console.log(error);
  _page.close();
  _ph.exit();
});
