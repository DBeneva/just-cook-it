const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
        required: [true, 'Meal name is required'],
        minLength: 4
    },
    ingredients: {
        type: String,
        required: [true, 'Ingredients are required'],
        minLength: 3
    },
    directions: {
        type: String,
        required: [true, 'Directions are required'],
        minLength: 3
    },
    imageUrl: {
        type: String,
        required: [true, 'Image URL is required'],
        match: [/^https?:\/\//, 'Image must be a valid URL']
    },
    likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }    
});

module.exports = model('Recipe', schema);