const router = require('express').Router();
const { validationResult } = require('express-validator');
const { isGuest } = require('../middlewares/guards');

router.post(
    '/register',
    isGuest(),
    async (req, res) => {
        console.log('in authcontroller.js router.post(register)');
        const { errors } = validationResult(req);
        console.log('errors in authcontroller', errors);

        try {
            if (errors.length > 0) {
                const message = errors.map(e => e.msg).join('\n');
                throw new Error(message);
            }

            const user = await req.auth.register(req.body.username.trim(), req.body.email.trim(), req.body.password.trim());

            res.json(user);
        } catch (err) {
            console.error('There has been an error in authController:', err.message);

            res.status(err.status || 400).json(err.message);
        }
    });

router.post('/login', isGuest(), async (req, res) => {
    console.log(req.body.username, 'is about to log in in server, authController');

    try {
        const user = await req.auth.login(req.body.username.trim(), req.body.password.trim());
        console.log(req.body.username, 'logged in successfully in server, authController');

        res.json(user);
    } catch (err) {
        console.error('There has been an error in authController:', err.message);

        const message = err.type == 'credential' ? 'Incorrect username or password!' : err.message;
        res.status(err.status || 400).json(message);
    }
});

router.get('/profile', (req, res) => {
    req.auth.getUserById(req.body.userId);
});

router.get('/logout', (req, res) => {
    console.log('User has logged out');

    res.json({});
});

module.exports = router;