const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { isGuest } = require('../middlewares/guards');

router.post(
    '/register',
    isGuest(),
    // body('username').notEmpty().withMessage('Username is required'),
    // body('email', 'Invalid email').isEmail(),
    // body('password')
    //     .isLength({ min: 5 }).withMessage('Password must be at least 5 characters long').bail()
    //     .matches(/^[a-zA-Z0-9]+$/).withMessage('Password may contain only numbers and latin letters'),
    // body('repass').custom((value, { req }) => {
    //     if (value != req.body.password) {
    //         throw new Error('Passwords don\'t match');
    //     }
    //     return true;
    // }),
    async (req, res) => {
        console.log('in authcontroller.js router.post(register)');
        const { errors } = validationResult(req);
        console.log(req.body);

        try {
            if (errors.length > 0) {
                const message = errors.map(e => e.msg).join('\n');
                throw new Error(message);
            }

            await req.auth.register(req.body.username.trim(), req.body.email.trim(), req.body.password.trim());

            res.json({ username: req.body.username });
        } catch (err) {
            console.error('There has been an error in authController:', err.message);

            res.status(err.status || 400).json(err.message);
        }
    });

router.post('/login', isGuest(), async (req, res) => {
    console.log(req.body.username, 'is about to log in in server, authController');

    try {
        await req.auth.login(req.body.username.trim(), req.body.password.trim());
        console.log(req.body.username, 'logged in successfully in server, authController');

        res.json({ username: req.body.username });
    } catch (err) {
        console.error('There has been an error in authController:', err.message);

        const message = err.type == 'credential' ? 'Incorrect username or password!' : err.message;
        res.status(err.status || 400).json(message);
    }
});

router.get('/profile', (req, res) => {
    req.auth.getUserById();
});

router.get('/logout', (req, res) => {
    console.log('User has logged out');

    res.json({});
});

module.exports = router;