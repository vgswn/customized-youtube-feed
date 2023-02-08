const ElasticCacher = require("./services/elasticCacher");
const Scheduler = require("./services/scheduler");
const express = require("express");
const bodyParser = require("body-parser")
const ytFeedRouter = require("./routers/ytFeed");

const app = express();

const main = async () => {
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

  app.use(bodyParser.json({ limit: "5mb" }));

  app.use("/", ytFeedRouter);
    // error middleware
  app.use((err, req, res, next) => {
    console.error(err.stack)
  })
}

setUps().then(main);