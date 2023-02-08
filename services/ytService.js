const ElasticCacher = require("./elasticCacher");
const QueryBuilder = require("./queryBuilder");
/**
 * Serive for the controller for
 * Specific apis handler
 */
class YtService {
  constructor() {
    this.elasticCacher = new ElasticCacher();
    this.queryBuilder = new QueryBuilder()
  }

  async findYtDocument(title, description, minPublishedAt, maxPublishedAt, page, limit) {
    const query = this.queryBuilder.buildQueryForYtFeed(title, description, minPublishedAt, maxPublishedAt, page, limit);
    const hits =  await (await this.elasticCacher.findDocument(query.index, query.body)).hits.hits.map((data) => data._source)
    return {
      status: 200,
      message: "Matched Results",
      data: hits
    }
  }
}

module.exports = YtService;
