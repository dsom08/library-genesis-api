const HTMLParser = require('node-html-parser');

// brittle function. dependent to library genesis website markup changes.
module.exports = function (html) {
  const root = HTMLParser.parse(html)
  return root.querySelector('div ul li a').getAttribute('href')
}