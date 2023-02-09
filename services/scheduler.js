const schedule = require('node-schedule');
const YoutubeScrapper = require('./youtubeScrapper');

class Scheduler {
  constructor() {
  }

  initCronJobs() {
    console.log("Setting ytScapperCron");
    const ytScapperCron = schedule.scheduleJob('*/1 * * * *', async function() {
      console.log('Running cron ytScapperCron');
      try {
        await (new YoutubeScrapper()).scrapDataFromYoutube()
      } catch (error) {
        console.error(error);
        // add alerting
      }
    });
  }
}

module.exports = Scheduler;