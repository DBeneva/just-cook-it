const router = require('express').Router();
const { isUser } = require('../middlewares/guards');

router.get('/', async (req, res) => {
    res.json({ title: 'Home' });
});

// router.get('/:id', isUser(), async (req, res) => {
//     const user = await req.storage.getUserById(req.params.id);
//     user.likedRecipes = user.likedRecipes.map(r => r.name);
//     res.json({ title: 'Your Profile', user });
// });

module.exports = router;