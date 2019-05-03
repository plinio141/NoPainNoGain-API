'use strict'

import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var OfficeSchema = Schema({
    code: {
        type: Number,
        required: [true, 'code_required'],
        unique: [true, 'code_unique'],
    },
    name: {
        type: String,
        required: [true, 'name_required'],
    },
    address: {
        type: String,
        required: [true, 'address_required'],
    },
    city: {
        type: 'ObjectId',
        ref: 'City',
        required: [true, 'city_required'],
    }

});
module.exports = mongoose.model('Office', OfficeSchema);
