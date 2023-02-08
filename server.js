const ElasticCacher = require("./services/elasticCacher");
const Scheduler = require("./services/scheduler");
const express = require("express");
const app = express();

const main = async () => {
  // error middleware
  app.use((err, req, res, next) => {
    console.error(err.stack)
  })
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.info(`Server is running on port ${port}`);
  });
};

const setUps = async() => {
  // setup elastic cache
  const elasticCacher = new ElasticCacher();
  await elasticCacher.setupIndexes();

  //init crons
  const cronScheduler = new Scheduler();
  cronScheduler.initCronJobs();
}

setUps().then(main);