const usus = require('usus')
const render = usus.render;
const express = require('express')
const app = express()
const launchChrome = usus.launchChrome;
const chromeLauncher = require('chrome-launcher');
const post = 0;
chromeLauncher.launch({
    startingUrl: 'https://maabac.com',
    chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox']
}).then(chrome => {
    port = chrome.port;
    console.log(`Chrome debugging port running on ${chrome.port}`);
});
const http = require('http');


async function get(url) {
    const data = await render('http://maabac.com' + url,{
        chromePort: port
    });
    return data;
}
http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var url = req.url;
    if(url == undefined)
        url = '';
    console.log('fetching:'+url);
    get(url).then((data) => {
        var back_data = data;
        res.end(back_data);
    });

}).listen(4000, '64.91.238.239');
