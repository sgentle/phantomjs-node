/*
 * How to run this example
 *
 *   cd examples
 *   npm install
 *   node out_obj.js
 *
 */

var phantom = require('phantom');

let _ph, _page, _outObj, arrayLength;

phantom.create().then(ph => {
  _ph = ph;
  return _ph.createPage();
}).then(page => {
  _page = page;
  _outObj = _ph.createOutObject();
  _outObj.urls_aborted = [];
  _outObj.urls_requested = [];
  _outObj.urls = [];
  page.property('onResourceRequested', function(requestData, networkRequest, out) {
    out.isMatch = (/https?:\/\/.+?\.(:?png|gif|jpeg|jpg|svg|swf|css|woff|ttf)/gi).test(requestData.url);
    if (out.isMatch) {
      // Abort requests matching the regex!
      networkRequest.abort();
      out.urls_aborted.push(requestData.url);
    } else {
      console.log("Does Not Match Abort Regex " + requestData.url);
      out.urls_requested.push(requestData.url);
    }
    out.urls.push(requestData.url);
  }, _outObj);
  return _page.open('https://stackoverflow.com/');
}).then(status => {
  return _outObj.property('urls');
}).then(function(requestsArray) {
  arrayLength = requestsArray.length;
  console.log("\nNUM Domains: " + arrayLength + "\n");
  for (var i = 0; i < arrayLength; i++) {
    console.log("Domains " + i + " => " + requestsArray[i]);
  }
  return _outObj.property('urls_aborted');
}).then(function(abortedArray) {
  arrayLength = abortedArray.length;
  console.log("\nNUM aborted: " + arrayLength + "\n");
  for (var i = 0; i < arrayLength; i++) {
    console.log("URL ABORT " + i + " => " + abortedArray[i]);
  }
  return _outObj.property('urls_requested');
}).then(function(requestedArray) {
  arrayLength = requestedArray.length;
  console.log("\nNUM requested: " + arrayLength + "\n");
  for (var i = 0; i < arrayLength; i++) {
    console.log("URL REQ  " + i + " => " + requestedArray[i]);
  }
  return _outObj.property('urls');
}).then(urls => {
  console.log(urls);
  _page.close();
  _ph.exit();
}).catch(console.error);
