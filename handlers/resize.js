const sharp = require('sharp');

const { IMAGE_HEIGHT, IMAGE_WIDTH } = process.env;

module.exports = {
  async resize(unaryRequest, callback) {
    const { request: { imageRequest } } = unaryRequest;

    for (const image of imageRequest) {
      try {
        image.chunk_data = await sharp(image.chunk_data) // eslint-disable-line
          .resize(IMAGE_WIDTH, IMAGE_HEIGHT)
          .toBuffer();
      } catch (error) {
        return callback(error);
      }
    }

    return callback(null, { imageRequest });
  },
};
