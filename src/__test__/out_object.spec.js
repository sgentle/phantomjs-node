import http from 'http';
import Phantom from '../phantom';
import 'babel-polyfill';
import OutObject from '../out_object';

describe('Command', () => {
    let server;
    let phantom;
    let port;
    beforeAll(done => {
        server = http.createServer((request, response) => response.end('hi, ' + request.url));
        server.listen(0, () => {
            port = server.address().port;
            done();
        });
    });

    afterAll(() => server.close());
    beforeEach(() => phantom = new Phantom());
    afterEach(() => phantom.exit());

    it('target to be set', () => {
        expect(phantom.createOutObject().target).toBeDefined();
    });

    it('#createOutObject() is a valid OutObject', () => {
        let outObj = phantom.createOutObject();
        expect(outObj).toBeInstanceOf(OutObject);
    });

    describe('#on', () => {
        'use strict';
        describe('("onResourceRequested", true)', () => {
            it('returns a value set by phantom', async () => {
                let page = await phantom.createPage();
                let outObj = phantom.createOutObject();

                await page.on('onResourceRequested', true, function(requestData, networkRequest, out) {
                    out.lastRequest = requestData;
                }, outObj);

                await page.open(`http://localhost:${port}/test`);

                let lastRequest = await outObj.property('lastRequest');

                expect(lastRequest.url).toEqual(`http://localhost:${port}/test`);
            });

            it('returns a value set by phantom and node', async () => {
                let page = await phantom.createPage();
                let outObj = phantom.createOutObject();

                outObj.test = 'fooBar$';

                await page.on('onResourceRequested', true, function(requestData, networkRequest, out) {
                    out.data = out.test + requestData.url;
                }, outObj);

                await page.open(`http://localhost:${port}/test2`);
                let data = await outObj.property('data');
                expect(data).toEqual(`fooBar$http://localhost:${port}/test2`);
            });

            it('works with input params', async () => {
                let page = await phantom.createPage();
                let outObj = phantom.createOutObject();

                await page.on('onResourceRequested', true, function(requestData, networkRequest, test, out) {
                    out.data = test;
                }, 'test', outObj);

                await page.open(`http://localhost:${port}/test2`);
                let data = await outObj.property('data');
                expect(data).toEqual('test');
            });
        });
        describe('("onResourceReceived", true)', () => {
            it('returns a value set by phantom', async () => {
                let page = await phantom.createPage();
                let outObj = phantom.createOutObject();

                await page.on('onResourceReceived', true, function(response, out) {
                    out.lastResponse = response;
                }, outObj);

                await page.open(`http://localhost:${port}/test`);

                let lastResponse = await outObj.property('lastResponse');

                expect(lastResponse.url).toEqual(`http://localhost:${port}/test`);
            });

            it('returns a value set by phantom and node', async () => {
                let page = await phantom.createPage();
                let outObj = phantom.createOutObject();

                outObj.test = 'fooBar$';

                await page.on('onResourceReceived', true, function(response, out) {
                    out.data = out.test + response.url;
                }, outObj);

                await page.open(`http://localhost:${port}/test2`);
                let data = await outObj.property('data');
                expect(data).toEqual(`fooBar$http://localhost:${port}/test2`);
            });

            it('works with input params', async () => {
                let page = await phantom.createPage();
                let outObj = phantom.createOutObject();

                await page.on('onResourceReceived', true, function(response, test, out) {
                    out.data = test;
                }, 'test', outObj);

                await page.open(`http://localhost:${port}/test2`);
                let data = await outObj.property('data');
                expect(data).toEqual('test');
            });
        });
    });

    describe('#property', () => {
        'use strict';
        describe('("onResourceRequested")', () => {
            it('returns a value set by phantom', async () => {
                let page = await phantom.createPage();
                let outObj = phantom.createOutObject();

                await page.property('onResourceRequested', function(requestData, networkRequest, out) {
                    out.lastRequest = requestData;
                }, outObj);

                await page.open(`http://localhost:${port}/test`);

                let lastRequest = await outObj.property('lastRequest');

                expect(lastRequest.url).toEqual(`http://localhost:${port}/test`);
            });

            it('returns a value set by phantom and node', async () => {
                let page = await phantom.createPage();
                let outObj = phantom.createOutObject();

                outObj.test = 'fooBar$';

                await page.property('onResourceRequested', function(requestData, networkRequest, out) {
                    out.data = out.test + requestData.url;
                }, outObj);

                await page.open(`http://localhost:${port}/test2`);
                let data = await outObj.property('data');
                expect(data).toEqual(`fooBar$http://localhost:${port}/test2`);
            });

            it('works with input params', async () => {
                let page = await phantom.createPage();
                let outObj = phantom.createOutObject();

                await page.property('onResourceRequested', function(requestData, networkRequest, test, out) {
                    out.data = test;
                }, 'test', outObj);

                await page.open(`http://localhost:${port}/test2`);
                let data = await outObj.property('data');
                expect(data).toEqual('test');
            });
        });
        describe('("onResourceReceived")', () => {
            it('returns a value set by phantom', async () => {
                let page = await phantom.createPage();
                let outObj = phantom.createOutObject();

                await page.property('onResourceReceived', function(response, out) {
                    out.lastResponse = response;
                }, outObj);

                await page.open(`http://localhost:${port}/test`);

                let lastResponse = await outObj.property('lastResponse');

                expect(lastResponse.url).toEqual(`http://localhost:${port}/test`);
            });

            it('returns a value set by phantom and node', async () => {
                let page = await phantom.createPage();
                let outObj = phantom.createOutObject();

                outObj.test = 'fooBar$';

                await page.property('onResourceReceived', function(response, out) {
                    out.data = out.test + response.url;
                }, outObj);

                await page.open(`http://localhost:${port}/test2`);
                let data = await outObj.property('data');
                expect(data).toEqual(`fooBar$http://localhost:${port}/test2`);
            });

            it('works with input params', async () => {
                let page = await phantom.createPage();
                let outObj = phantom.createOutObject();

                await page.property('onResourceReceived', function(response, test, out) {
                    out.data = test;
                }, 'test', outObj);

                await page.open(`http://localhost:${port}/test2`);
                let data = await outObj.property('data');
                expect(data).toEqual('test');
            });
        });
    });
});
