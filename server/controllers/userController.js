const router = require('express').Router();
const { isUser } = require('../middlewares/guards');

router.put('/:id', isUser(), async (req, res) => {
    const existingUsername = await req.storage.getUserByUsername(req.body.username);
    const existingEmail = await req.storage.getUserByEmail(req.body.email);

    const accountData = {
        username: req.body.username,
        email: req.body.email
    };

    console.log('usercontroller username', req.body, req.user);

    try {
        if (req.user.username != req.body.username && existingUsername) {
            throw new Error('Sorry, this username is taken!');
        } else if (req.user.email != req.body.email && existingEmail) {
            throw new Error('Sorry, this email is taken!');
        }

        if (req.params.id != req.user._id) {
            throw new Error('You are not allowed to edit this account!');
        }

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

router.put('/:id/change-password', isUser(), async (req, res) => {
    console.log('usercontroller password req.params.id, req.user.id', req.params.id, req.user._id);
    console.log('usercontroller password user', req.user);

    if (req.params.id != req.user._id) {
        throw new Error('You are not allowed to edit this account!');
    }

    const passwordData = {
        oldPassword: req.body.oldPassword,
        newPassword: req.body.newPassword
    };

    console.log('usercontroller password data', passwordData);

    try {
        const editedUserData = await req.auth.changePassword(req.params.id, passwordData);
        console.log('change password controller sending to FE', editedUserData);
        res.json(editedUserData);
    } catch (err) {
        console.log(err.message);
        res.status(err.status || 404).json(err.message);
    }
});

module.exports = router;