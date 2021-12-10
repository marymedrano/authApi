import { Schema, model, SchemaTypes } from 'mongoose';

const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    role: {
        name: {
            type: String,
            required: true,
            max: 255,
            min: 4
        },
        permissions: {
            type: Schema.Types.Mixed,
            require: true
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.models.userSchema || mongoose.model('User', userSchema);
 export default model('User', userSchema);