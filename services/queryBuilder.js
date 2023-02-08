const esb = require('elastic-builder')
/**
 * Wrapper class to build queries based on specific parameters
 */
class QueryBuilder {
  constructor() {}
  buildQueryForYtFeed(title, description, minPublishedAt, maxPublishedAt, page, limit) {
    let query = esb.boolQuery().must(esb.matchAllQuery())
    if(description) {
      query = query.filter(esb.matchPhraseQuery('description', `*${description}*`))
    }

    if (title) {
      query = query.filter(esb.matchPhraseQuery('title', `*${title}*`))
    }

    if (minPublishedAt) {
      query = query.must(esb.rangeQuery('publishedAt').gte(minPublishedAt))
    }

    if (maxPublishedAt) {
      query = query.must(esb.rangeQuery('publishedAt').lte(maxPublishedAt ))
    }
    return {
      index: "customized-youtube-feed",
      body:  esb.requestBodySearch().query(query).size(limit).from(page).toJSON()
    };    
  }
}
module.exports = QueryBuilder;
