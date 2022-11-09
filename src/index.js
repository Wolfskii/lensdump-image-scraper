import nodeFetch from 'node-fetch'
import fetchCookie from 'fetch-cookie'
import * as cheerio from 'cheerio'
const fetch = fetchCookie(nodeFetch)

const lensdumpScraper = {
  /**
   * Scrapes data from an URL
   * @param {String} url - URL to scrape data from
   * @returns - Body/data of the URL
   */
  async getImagesFromAlbumUrl(albumUrl) {
    const html = await this.getHtmlContent(albumUrl) // Getting the HTML from the album-URL
    const imageUrls = await this.getImagesFromAlbumHtml(html) // Getting the image-URLs from the album-HTML

    return imageUrls
  },

  /**
   * Scrapes data from an URL
   * @param {String} url - URL to scrape data from
   * @returns - Body/data of the URL
   */
  async getHtmlContent(url) {
    const response = await fetch(url) // Getting the HTML-data from the url
    const body = await response.text()

    return body
  },

  /**
   * Gets the image-URLs from the body/HTML provided
   * @param {Object} html - HTML/Body
   * @returns scraped image-URLs
   */
  async getImagesFromAlbumHtml(html) {
    const imageUrls = []
    const getHigherResImgUrl = this.getHigherResImgUrl

    console.log('Fetching images from Album... ')

    const $ = await cheerio.load(html)
    const foundImageElements = $('.image-container img')

    $(foundImageElements).each(function (i, link) {
      let currUrl = $(this).attr('src') // Getting the URL of the current img

      if (currUrl !== undefined) {
        currUrl = getHigherResImgUrl(currUrl)
        imageUrls.push(currUrl)
      }
    })

    if (imageUrls.length > 0) {
      console.log('OK\nImages found!')
    } else {
      console.log('No images found...')
    }

    return imageUrls
  },

  /**
   * Gets the full-res image-URL from a lower-res Lensdump image-URL
   * @param {string} lowResImgUrl - The low-res image-URL
   * @returns {string} The higher-res image-URL
   */
  getHigherResImgUrl(lowResImgUrl) {
    return lowResImgUrl.replace('.md', '')
  }
}

export default lensdumpScraper
