const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../config');

module.exports = () => (req, res, next) => {
    if (parseToken(req, res)) {
        req.auth = {
            register,
            login
        };

        next();
    }

    async function register(username, email, password) {
        const existingUsername = await req.storage.getUserByUsername(username);
        const existingEmail = await req.storage.getUserByEmail(email);

        if (existingUsername) {
            throw new Error('Username is taken!');
        } else if (existingEmail) {
            throw new Error('Email is taken!');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await req.storage.createUser(username, email, hashedPassword);

        return generateToken(user);
    }

    async function login(username, password) {
        const user = await req.storage.getUserByUsername(username);
        const isCorrectPassword = user ? await bcrypt.compare(password, user.hashedPassword) : false;

        console.log(`Has ${username} entered the correct password?: ${isCorrectPassword}`);

        if (!user || !isCorrectPassword) {
            const err = !user ? new Error('No such user') : new Error('Incorrect password');
            err.type = 'credential';
            throw err;
        }

        return generateToken(user);
    }
}

function generateToken(userData) {
    return jwt.sign({
        _id: userData._id,
        username: userData.username,
        email: userData.email
    }, TOKEN_SECRET);
}

function parseToken(req, res) {
    const token = req.headers['x-authorization'];

    if (token) {
        try {
            const userData = jwt.verify(token, TOKEN_SECRET);
            req.user = userData;
            console.log('Known user', req.user.username);
        } catch (err) {
            return res.status(401).json({ message: 'Please sign in!' });
        }
    }

    return true;
}