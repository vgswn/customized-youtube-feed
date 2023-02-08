const httpClient = require("../utils/httpClient");
const moment = require("moment-timezone");
const httpStatus = require("http-status");
const { pick } = require("lodash");
const ElasticCacher = require("./elasticCacher");
const { ENV_CONSTANT } = require("../configs/envConstants");
/**
 * Wrapper class for youtube api
 */
class YoutubeScrapper {
  constructor() {
    this.defaultKeyword = ENV_CONSTANT.ytKeyword;
    this.googleApiKey = ENV_CONSTANT.googleApiKey;
    this.defaultInterval = 60 * 1000; // 60 secs
    this.snippetDataKeys =  [ "thumbnails","title","description","publishedAt" ]
    this.elasticCacher = new ElasticCacher();
  }

  /**
   * Takes page token and calls youtube for data
   * @param {*} pageToken 
   * @returns 
   *  status: integer
   *  data: json
   */
  async __fetchDataFromYoutube(pageToken) {
    let response;
    try {
      const url = `https://youtube.googleapis.com/youtube/v3/search`
      const params = {
        q: this.defaultKeyword,
        order: "date",
        key: this.googleApiKey,
        part: "snippet",
        publishedAfter: moment.tz().subtract(this.defaultInterval, "milliseconds").toISOString(),
        maxResults: 10,
        pageToken
      }
      response = await httpClient.get(url, { params });
      response =  {
        status: response.status,
        data: response.data
      }
    } catch (error) {
      console.error(error);
      response = {
        status: error.response.status,
        data: error.response.data
      }
    }
    return response
  }

  /**
   * Handler Function to call paginated youtube api and index the data into elastic search
   * @returns 
   */

  async scrapDataFromYoutube() {
    let nextPageAvailable = true;
    let pageToken = undefined;
    let data = [];
    while(nextPageAvailable) {
      console.debug("calling youtube api");
      const ytRes = await this.__fetchDataFromYoutube(pageToken);
      if (ytRes.status == httpStatus.OK) {
        data = data.concat(
          ytRes.data.items.map((item) => {
            const document = pick(item.snippet, this.snippetDataKeys)
            return {id: item.id.videoId, document};
          })
        )
        pageToken = ytRes.data.nextPageToken;
        nextPageAvailable = !!pageToken;
      } else {
        throw Error(`Youtube Responded with non 200 status: ${JSON.stringify(ytRes.data)}`);
      }
    }
    for(let ytData of data) {
      console.debug("creating index for id: ", ytData.id);
      await this.elasticCacher.indexDocument(ytData.id, "customized-youtube-feed", ytData.document)
    }
    return true;
  }
}

module.exports = YoutubeScrapper;