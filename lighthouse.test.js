const lighthouse = require("lighthouse"); // Node CLI for Lighthouse https://www.npmjs.com/package/lighthouse#using-the-node-cli
const chromeLauncher = require("chrome-launcher"); // Launch Chrome from node

jest.setTimeout(60000);

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
    launchChromeAndRunLighthouse(`https://stage.frontendweekend.ml`).then(
        ({lhr: {categories}}) => {
            expect(categories["accessibility"].score).toBeGreaterThanOrEqual(0.6);
            expect(categories["best-practices"].score).toBeGreaterThanOrEqual(1);
            expect(categories["performance"].score).toBeGreaterThanOrEqual(0.8);
            expect(categories["pwa"].score).toBeGreaterThanOrEqual(0.6);
            expect(categories["seo"].score).toBeGreaterThanOrEqual(1);
        }
    ));