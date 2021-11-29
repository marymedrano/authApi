import { Schema, model, SchemaTypes } from 'mongoose';

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
        },
        loan:{
            type: Schema.Types.Mixed,
            require: false
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default model('User', userSchema);