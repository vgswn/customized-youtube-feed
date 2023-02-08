const mappings = require("../utils/elasticMappings");
/**
 * Wrapper Class for ElasticSearch
 * Have functionalities like setup indexes, index documents and querying the elastic search
 */
class ElasticCacher {
  constructor() {
    this.client = require("./elasticSearch");
  }

  async setupIndexes() {
    for(let indexData of mappings) {
      const exists = await this.client.indices.exists({index: indexData.index});
      if(exists) {
        await this.client.indices.putMapping({
          index: indexData.index,
          body: indexData.mappings
        })
      } else {
        await this.client.indices.create(indexData)
      }
    }
  }

  async indexDocument(id, indexName, document) {
    await this.client.index({
      index: indexName,
      document,
      id
    })
  }

  async findDocument(index, body) {
    return await this.client.search({index, body})
  }
}

module.exports = ElasticCacher;
