const { Client } = require("@elastic/elasticsearch");
/**
 * Elasstic Seach Setup
 */
const elasticClient = new Client({
  node: 'http://elasticsearch:9200',
});
module.exports = elasticClient;