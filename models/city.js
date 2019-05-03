'use strict'

import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var CitySchema = Schema({
    code: {
        type: Number,
        required: [true, 'code_required'],
        unique: [true, 'code_unique'],
    },
    name: {
        type: String,
        required: [true, 'address_name'],
    },
});
module.exports = mongoose.model('City', CitySchema);
