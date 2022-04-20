module.exports = {
    isUser,
    isGuest,
    isOwner,
    isNotOwner
};

function isUser() {
    return (req, res, next) => {
        console.log('req.user in isUser middleware', req.user);

        if (req.body.user) {
            next();
        } else {
            res.status(401).json({ message: 'Please sign in!' });
        }
    }
}

function isGuest() {
    console.log('Is the user a guest?');

    return (req, res, next) => {
        if (!req.body.user) {
            next();
        } else {
            res.status(403).json({ message: 'Logged in users cannot access this page!' });
        }
    }
}

function isOwner() {
    return (req, res, next) => {
        const userIsOwner = req.user?._id === req.data.owner._id;

        if (userIsOwner) {
            next();
        } else {
            res.status(403).json({ message: 'You are not allowed to modify this recipe!' });
        }
    }
}

function isNotOwner() {
    return (req, res, next) => {
        const userIsOwner = req.user?._id === req.data.owner._id;

        if (!userIsOwner) {
            next();
        } else {
            res.status(403).json({ message: 'You are not allowed to modify this recipe!' });
        }
    }
}