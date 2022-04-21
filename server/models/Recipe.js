const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
        required: [true, 'Meal name is required'],
        minLength: 4
    },
    ingredients: {
        type: String,
        required: [true, 'Please add ingredients!'],
        minLength: 3
    },
    directions: {
        type: String,
        required: [true, 'Please add cooking directions!'],
        minLength: 3
    },
    time: {
        type: Number,
        required: [true, 'Please add cooking time!']
    },
    imageUrl: {
        type: String,
        required: [true, 'Please add an image URL!'],
        match: [/^https?:\/\//, 'Image must be a valid URL']
    },
    likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }    
});

module.exports = model('Recipe', schema);