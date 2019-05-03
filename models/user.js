'use strict'

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;

var UserSchema = Schema({
    firstName: {
        type: String,
        required: [true, 'firstName_required'],
    },
    lastName: {
        type: String,
        required: [true, 'lastName_required'],
    },
    email: {
        type: String,
        required: [true, 'email_required'],
        unique:  [true, 'email_unique']
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'client'],
        default: 'client'
    },
    office: {
        type: 'ObjectId',
        ref: 'Office'
    }

});

UserSchema.pre('save', async function() {
    if(this.isModified('password')){
        try {
            this.password = await bcrypt.hashSync(this.password,10);   
        } catch (error) {
            console.log(error);
            
        }
    }
});

UserSchema.methods.validPassword = async function(password) {
    return await bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', UserSchema);
