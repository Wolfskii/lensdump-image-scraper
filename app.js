'use strict'

// Imports
import WebScraper from './lib/WebScraper.js'

// App variables
const testUrl = 'https://lensdump.com/a/RP3iZ'

// Instantiation
const webScraper = new WebScraper()

async function start(albumUrl) {
  const imageUrls = await webScraper.getImagesFromAlbumUrl(albumUrl)
  console.log(imageUrls)
}

start(testUrl)
