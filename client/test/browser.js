var jsdom = require('jsdom');

// setup the simplest document possible
var document = jsdom.jsdom('');


// get the window object out of the document
var window = document.defaultView;

// set globals for mocha that make access to document and window feel 
// natural in the test environment
global.document = document;
global.window = window;
global.$ = require('jquery');

// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal(windows) {
  for (let key in windows) {
    if (!windows.hasOwnProperty(key)) continue
    if (key in global) continue

    global[key] = windows[key];
  }
}
// take all properties of the window object and also attach it to the 
// mocha global object
propagateToGlobal(window);
