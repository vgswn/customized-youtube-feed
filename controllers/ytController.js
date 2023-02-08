const YtService = require("../services/ytService");
const ytService = new YtService()
/**
 * Controller function for youtube fee GET API
 * takes all filters and returns json response
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function ytFeed(req, res, next) {
  try {
    let {title, description, minPublishedAt, maxPublishedAt, page, limit} = req.query;
    page = page || 0;
    limit = limit || 10;
    const response = await ytService.findYtDocument(title, description, minPublishedAt, maxPublishedAt, page, limit);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}
module.exports = { ytFeed }