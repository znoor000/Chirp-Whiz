const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://chirp-whiz-20191115172533-hostingbucket-myenv.s3-website.us-east-2.amazonaws.com/');
  await page.screenshot({path: 'chirp-whiz.png'});

  await browser.close();
})();