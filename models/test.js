var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// our schema 

function dynamicSchema(prefix) {
    var addressSchema = new Schema({
        city: { type: String, required: true },
        state: { type: String, required: true },
    });
    return mongoose.model(prefix, addressSchema);
}

//no we export dynamicSchema function
module.exports = dynamicSchema;