module.exports = {
    isUser,
    isGuest
};

function isUser() {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.status(401).json({ message: 'Please sign in!' });
        }
    }
}

function isGuest() {
    return (req, res, next) => {
        if (!req.user) {
            next();
        } else {
            res.status(403).json({ message: 'Logged in users cannot access this page!' });
        }
    }
}