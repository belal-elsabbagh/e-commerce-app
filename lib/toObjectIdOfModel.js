const mongoose = require('mongoose')
import {NotFoundError} from "../errors";
module.exports = async (model, id) => {
    if ((await model.findById(id)) === null) throw new NotFoundError('This id was not found in the collection')
    return new mongoose.Types.ObjectId(id);
}