const User = require('../models/User');

module.exports = {
    createUser,
    getUserByUsername,
    getUserByEmail,
    getUserById
};

async function createUser(username, email, hashedPassword) {
    const user = await new User({ username, email, hashedPassword }).save();
    return user;
}

async function getUserByUsername(username) {
    const user = await User.findOne({ username: { $regex: username, $options: 'i' } }).lean();
    console.log('User in server, user service:', user);
    return user;
}

async function getUserByEmail(email) {
    const pattern = new RegExp(`^${email}$`, 'i');
    const user = await User.findOne({ email: { $regex: pattern } }).lean();
    return user;
}

async function getUserById(id) {
    const user = await User.findById(id).populate('reservations').lean();
    return user;
}