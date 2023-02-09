const mappings = require("../utils/elasticMappings");
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
}

module.exports = ElasticCacher;
