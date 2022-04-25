const { Schema, model } = require('mongoose');

const schema = new Schema({
    email: { type: String },
    username: { type: String },
    hashedPassword: { type: String, required: true },
    recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe', default: [] }],
    likedRecipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe', default: [] }]
});

module.exports = model('User', schema);