const lighthouse = require("lighthouse"); // Node CLI for Lighthouse https://www.npmjs.com/package/lighthouse#using-the-node-cli
const chromeLauncher = require("chrome-launcher"); // Launch Chrome from node

jest.setTimeout(60000)

let SITE_URL

var PRODUCTION_BUILD = process.env['CIRCLE_BRANCH'] === 'master'
if (PRODUCTION_BUILD) {
  SITE_URL = `https://frontendweekend.ml`
} else {
  const PR_NUMBER = (process.env['CIRCLE_PULL_REQUEST']).match(/(\d+)$/)[1]
  SITE_URL = `https://deploy-preview-${ PR_NUMBER }--frontendweekend.netlify.com`
}

const launchChromeAndRunLighthouse = (
    url,
    opts = {chromeFlags: []},
    config = null
) =>
    chromeLauncher.launch({chromeFlags: opts.chromeFlags}).then(chrome => {
        opts.port = chrome.port;
        return lighthouse(url, opts, config).then(results =>
            chrome.kill().then(() => results)
        );
    });

test("All categories score", () =>
    launchChromeAndRunLighthouse(SITE_URL).then(
        ({lhr: {categories}}) => {
            expect(categories["accessibility"].score).toBeGreaterThanOrEqual(0.9); // TODO change back to 1 once the winter is over
            expect(categories["best-practices"].score).toBeGreaterThanOrEqual(1);
            expect(categories["performance"].score).toBeGreaterThanOrEqual(0.8); // TODO change back to 1 once the winter is over
            expect(categories["pwa"].score).toBeGreaterThanOrEqual(1);
            expect(categories["seo"].score).toBeGreaterThanOrEqual(PRODUCTION_BUILD ? 1 : 0.8);
        }
    ));
