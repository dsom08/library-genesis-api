const HTMLParser = require('node-html-parser');

// brittle function. dependent to library genesis website markup changes.
function bookDataMapper (book) {
  const tdArray = book.querySelectorAll('td')
  return {
    md5: tdArray[1].querySelector('a').getAttribute('href').split("md5=")[1],
    thumbnail: tdArray[1].querySelector('img').getAttribute('src'),
    title: tdArray[3].querySelector('b a').text,
    author: tdArray[6].querySelector('b a').text,
    publisher: tdArray[12].text,
    year: tdArray[16].text,
    edition: tdArray[18].text,
    language: tdArray[20].text,
    pages: tdArray[22].text,
    id: tdArray[26].text,
    size: tdArray[32].text,
    extension: tdArray[34].text,
  }
}

// TODO: retrieve more result information search result
function getSearchResultSummary (root) {
  const resultText = root.querySelectorAll('font')[2].rawText.split(' ')
  return {
    count: resultText[0],
    from: resultText[7],
    to: resultText[9]
  }
}

module.exports = function (html) {
  const root = HTMLParser.parse(html)
  const summary = getSearchResultSummary(root);
  const bookRaw = root.querySelectorAll('table[rules=cols]').filter((a,i)=>i%2===0)
  const books = []
  bookRaw.forEach(book => books.push(bookDataMapper(book)))

  return {
    books: books,
    summary: summary,
  }
}
