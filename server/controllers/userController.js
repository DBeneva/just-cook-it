const router = require('express').Router();
const { isUser } = require('../middlewares/guards');

router.put('/:id', isUser(), async (req, res) => {
    console.log('usercontroller edit req.params.id, req.user.id', req.params.id, req.user._id);
    console.log('usercontroller edit token', req.user.token);
    if (req.params.id != req.user._id) {
        throw new Error('You are not allowed to edit this account!');
    }
    
    const accountData = {
        username: req.body.username,
        email: req.body.email
    };

    console.log('usercontroller account data', accountData);

    try {
        const editedAccountData = await req.storage.editAccount(req.params.id, accountData);
        console.log('usercontroller', editedAccountData);        
        console.log('usercontroller', { ...editedAccountData, token: req.headers['x-authorization'] });
        res.json({ ...editedAccountData, token: req.headers['x-authorization'] });
    } catch (err) {
        console.log(err.message);
        res.status(err.status || 404).json(err.message);
    }
});

router.delete('/:id', isUser(), async (req, res) => {
    console.log('delete controller req.user._id', req.user._id, req.params.id);
    
    if (req.params.id !== req.user._id) {
        throw new Error('You are not allowed to delete this account!');
    }

    try {
        console.log('usercontroller delete before');
        await req.storage.deleteAccount(req.params.id);
        console.log('usercontroller delete after');
        res.json({});
    } catch (err) {
        console.log(err.message);
        res.status(err.status || 404).json(err.message);
    }
});

module.exports = router;