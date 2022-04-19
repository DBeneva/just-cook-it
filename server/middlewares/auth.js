const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET, COOKIE_NAME } = require('../config');

module.exports = () => (req, res, next) => {
    if (parseToken(req, res)) {
        req.auth = {
            register,
            login,
            logout
        };

        next();
    }

    async function register(username, email, password) {
        console.log('in register auth.js');
        const existingUsername = await req.storage.getUserByUsername(username);
        const existingEmail = await req.storage.getUserByEmail(email);
        console.log(existingEmail, existingUsername);

        if (existingUsername) {
            throw new Error('Username is taken!');
        } else if (existingEmail) {
            throw new Error('Email is taken!');
        }

        console.log('username email password', username, email, password);
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        const user = await req.storage.createUser(username, email, hashedPassword);
        console.log(user);

        const token = generateToken(user);
        res.cookie(COOKIE_NAME, token);

        return token;
    }

    async function login(username, password) {
        const user = await req.storage.getUserByUsername(username);
        
        const hasMatch = user ? await bcrypt.compare(password, user.hashedPassword) : false;

        console.log('Is it the correct password?:', hasMatch);

        if (!user || !hasMatch) {
            const err = !user ? new Error('No such user') : new Error('Incorrect password');
            err.type = 'credential';
            throw err;
        }

        const token = generateToken(user);
        res.cookie(COOKIE_NAME, token);

        console.log('Cookies in server, auth middleware:', req.cookies);
        console.log('Signed cookies in server, auth middleware:', req.signedCookies);

        return token;
    }

    function logout() {
        console.log('in auth logout');
        res.clearCookie(COOKIE_NAME);
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
    const token = req.cookies[COOKIE_NAME];

    if (token) {
        try {
            const userData = jwt.verify(token, TOKEN_SECRET);
            req.user = userData;
            res.locals.user = userData; // visible in the layout (manages user/guest nav)
            console.log('Known user', req.user.username);
        } catch (err) {
            res.clearCookie(COOKIE_NAME);
            res.redirect('/login');

            return false;
        }
    }

    return true;
}