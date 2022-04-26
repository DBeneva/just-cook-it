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
            throw new Error('Sorry, this username is taken!');
        } else if (existingEmail) {
            throw new Error('Sorry, this email is taken!');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await req.storage.createUser(username, email, hashedPassword);

        return {
            username: user.username,
            _id: user._id,
            email: user.email,
            token: generateToken(user)
        };
    }

    async function login(username, password) {
        const user = await req.storage.getUserByUsername(username);
        const isCorrectPassword = user ? await bcrypt.compare(password, user.hashedPassword) : false;

        if (!user || !isCorrectPassword) {
            const error = !user ? new Error('This username does not exist') : new Error('Incorrect password');
            error.type = 'credential';
            throw error;
        }

        const token = generateToken(user);
        console.log('auth login token', token);

        return {
            username: user.username,
            _id: user._id,
            email: user.email,
            token: token
        };
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
    console.log('auth parse token', token);

    if (token) {
        try {
            const userData = jwt.verify(token, TOKEN_SECRET);
            req.user = userData;

            console.log('Known user:', req.user.username);
        } catch (err) {
            return res.status(401).json({ message: 'Please sign in!' });
        }
    }

    return true;
}