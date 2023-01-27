const logObjectToFile = require('../log');

module.exports = async function (req, res, next) {
  const {
    method,
    originalUrl,
    headers: { authorization },
    body,
    query,
  } = req;
  const toBeLogged = {
    receivedAt: new Date().toISOString(),
    method,
    originalUrl,
    query,
    authorization,
    body,
  };
  try {
    await logObjectToFile(__dirname + '/../log/requests.log', toBeLogged);
    next();
  } catch (err) {
    next(err);
  }
};
