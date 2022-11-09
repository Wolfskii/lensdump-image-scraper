'use strict'

// Imports
import WebScraper from './lib/WebScraper.js'

// App variables
const testUrl = 'https://lensdump.com/a/RP3iZ'

// Instantiation
const webScraper = new WebScraper()

async function start(albumUrl) {
  // TODO: Make combining method directly in class
  const body = await webScraper.getContent(albumUrl) // Getting the HTML from the album-URL
  const imageUrls = await webScraper.getImagesFromAlbum(body) // Getting the image-URLs from the album-HTML
}

start(testUrl)
