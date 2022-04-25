const router = require('express').Router();
const { isUser } = require('../middlewares/guards');

router.put('/:id', isUser(), async (req, res) => {
    const accountData = {
        username: req.body.username,
        email: req.body.email,
    };

    try {
        const editedAccountData = await req.storage.editAccount(req.params.id, accountData);
        
        console.log('usercontroller', editedAccountData);
        res.json(editedAccountData);
    } catch (err) {
        console.log(err.message);
        res.status(err.status || 404).json(err.message);
    }
});

module.exports = router;