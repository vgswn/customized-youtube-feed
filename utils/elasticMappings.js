/**
 * All index mappings
 */
const mappings = [{
  index: "customized-youtube-feed",
  mappings: {
    properties: {
      title: { type: "text", index: true },
      description: { type: "text", index: true },
      publishedAt: { type: "date", index: true },
      thumbnails: {
        type: "nested",
        properties: {
          default: {
            properties: {
              url: { type: "text" },
              width: { type: "long" },
              height: { type: "long" }
            }
          },
          medium: {
            properties: {
              url: { type: "text" },
              width: { type: "long" },
              height: { type: "long" }
            }
          },
          high: {
            properties: {
              url: { type: "text" },
              width: { type: "long" },
              height: { type: "long" }
            }
          }
        }
      }
    }
  }
}]

module.exports = mappings;