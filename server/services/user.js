const User = require('../models/User');

module.exports = {
    createUser,
    getUserByUsername,
    getUserByEmail,
    getUserById
};

async function createUser(username, email, hashedPassword) {
    const user = new User({ username, email, hashedPassword });
    return await user.save();
}

async function getUserByUsername(username) {
    const user = User.findOne({
        username: {
            $regex: `^${username}$`,
            $options: 'i'
        }
    });

    return await user.lean();
}

async function getUserByEmail(email) {
    const user = User.findOne({ email });
    return await user.lean();
}

async function getUserById(id) {
    const user = User.findById(id).populate('recipes');
    return await user.lean();
}