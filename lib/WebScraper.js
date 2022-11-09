'use strict'

import nodeFetch from 'node-fetch'
import fetchCookie from 'fetch-cookie'
import * as cheerio from 'cheerio'
const fetch = fetchCookie(nodeFetch)

/**
 * WebScraper class that scrapes the data and content of urls/html
 *
 * @author Dawid Kaleta
 * @version 1.0.0
 * @class WebScraper
 */
export default class WebScraper {
  /**
   *Creates an instance of WebScraper.
   * @param {String} albumUrl - The starting URL of a Lensdump-album
   * @memberof WebScraper
   */
  constructor () {
    // Starting variables
    this.imageUrls = []
  }

  /**
   * Scrapes data from an URL
   * @param {String} url - URL to scrape data from
   * @returns - Body/data of the URL
   * @memberof WebScraper
   */
  async getContent (url) {
    // Getting the html from the url
    const response = await fetch(url)

    const body = await response.text()

    return body
  }

  /**
   * Gets the image-URLs from the body/HTML provided
   * @param {Object} html - HTML/Body
   * @returns scraped image-URLs
   * @memberof WebScraper
   */
  getImagesFromAlbum (html) {
    const imageUrls = []

    process.stdout.write('Fetching images from Album... ')

    const $ = cheerio.load(html)
    const foundImageLinkElements = $('.image-container')

    $(foundImageLinkElements).each(function (i, link) {
      // Getting the URL of the current link
      const currUrl = $(this).children()[0]

      if (currUrl !== undefined) {
        imageUrls.push(currUrl)
      }
    })

    console.log(imageUrls)

    if (imageUrls.length > 0) {
      process.stdout.write('OK\nImages found!')
    } else {
      process.stdout.write('No images found...')
    }

    return imageUrls
  }

  /**
   * Scrapes movies and their times
   * @param {string} list - image-URL list
   * @returns - Images
   * @memberof WebScraper
   */
  getImagesFromImageList (list) {
    // TODO: Implement method
  }
}
