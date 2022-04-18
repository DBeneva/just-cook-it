const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { isGuest } = require('../middlewares/guards');

// router.get('/register', isGuest(), (req, res) => {
//     res.render('register', { title: 'Register' });
// });

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

            res.redirect('/');
        } catch (err) {
            console.log(err.message);

            const ctx = {
                title: 'Register',
                errors: err.message.split('\n'),
                userData: {
                    username: req.body.username,
                    email: req.body.email
                }
            };

            res.json(ctx);
        }
    });

// router.get('/login', isGuest(), (req, res) => {
//     res.json({ title: 'Login' });
// });

router.post('/login', isGuest(), async (req, res) => {
    console.log('req. body in authcontroller', req.body);
    try {
        await req.auth.login(req.body.username.trim(), req.body.password.trim());
        console.log('successful login');
        res.json({ username: req.body.username });
    } catch (err) {
        console.log(err.message);

        const ctx = {
            errors: err.type == 'credential' ? ['Incorrect username or password'] : [err.message],
            username: req.body.username
        };

        res.json(ctx);
    }
});

router.get('/profile', (req, res) => {
    req.auth.getUserById();
});

router.get('/logout', (req, res) => {
    console.log('in auth controller logout');
    req.auth.logout();
});

module.exports = router;