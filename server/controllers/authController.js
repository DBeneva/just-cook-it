const router = require('express').Router();
const { validationResult } = require('express-validator');
const { isGuest } = require('../middlewares/guards');

router.post(
    '/register',
    isGuest(),
    async (req, res) => {
        const { errors } = validationResult(req);

        try {
            if (errors.length > 0) {
                const message = errors.map(e => e.msg).join('\n');
                throw new Error(message);
            }

            const user = await req.auth.register(req.body.username.trim(), req.body.email.trim(), req.body.password.trim());
            res.json(user);
        } catch (err) {
            res.status(err.status || 400).json(err.message);
        }
    });

router.post('/login', isGuest(), async (req, res) => {
    try {
        const user = await req.auth.login(req.body.username.trim(), req.body.password.trim());
        res.json(user);
    } catch (err) {
        const message = err.type == 'credential' ? 'Incorrect username or password!' : err.message;
        res.status(err.status || 400).json(message);
    }
});

router.get('/logout', (req, res) => {
    res.json({});
});

module.exports = router;