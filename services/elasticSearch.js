const { Client } = require("@elastic/elasticsearch");
const elasticClient = new Client({
  node: 'http://elasticsearch:9200',
});
console.log(elasticClient.info());
module.exports = elasticClient;