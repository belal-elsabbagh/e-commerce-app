const fs = require('fs').promises;
const { InternalServerError } = require('../errors');
module.exports = async (filePath, object) => {
  try {
    const space = 2;
    await fs.appendFile(filePath, JSON.stringify(object, null, space) + ',\n');
    return true;
  } catch (err) {
    throw new InternalServerError(`Failed to log ${object} to file \'${filePath}\'.`);
  }
};
