const router = require('express').Router();
const { isUser } = require('../middlewares/guards');

router.get('/', async (req, res) => {
    const recipes = await req.storage.getAllRecipes();
    res.json(recipes);
});

router.post('/', isUser(), async (req, res) => {
    const recipeData = {
        name: req.body.recipeName,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        imageUrl: req.body.imageUrl,
        time: req.body.time,
        likedBy: [],
        owner: req.body.user
    };
    
    try {
        const recipe = await req.storage.createRecipe(recipeData);
        res.json(recipe);
    } catch (err) {
        let message = err.message;
        console.log(message);

        if (err.name == 'ValidationError'){
            message = Object.values(err.errors).map(e => e.properties.message)[0];
            console.log(message);
        }

        res.status(err.status || 400).json({ message });
    }
});

router.get('/:id', isUser(), async (req, res) => {
    try {
        const recipe = await req.storage.getRecipeById(req.params.id);
        recipe.isUser = Boolean(req.user);
        recipe.isOwner = req.user && recipe.owner == req.user._id;
        recipe.hasLiked = req.user && recipe.likedBy.find(u => u._id == req.user._id);

        res.json(recipe);
    } catch (err) {
        console.log(err.message);
        res.status(404).json(err.message);
    }
});

router.put('/:id', isUser(), async (req, res) => {
    const recipeData = {
        name: req.body.recipeName,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        imageUrl: req.body.imageUrl,
        time: req.body.time,
        likedBy: [],
        owner: req.body.owner._id
    };

    try {
        const recipe = await req.storage.getRecipeById(req.params.id);

        if (recipe.owner != req.user._id) {
            throw new Error('You cannot edit a recipe that you haven\'t created!');
        }

        const editedRecipe = await req.storage.editRecipe(recipe._id, recipeData);
        console.log('edited recipe in recipe controller', editedRecipe);
        res.json(editedRecipe);
    } catch (err) {
        console.log(err.message);
        res.status(err.status || 404).json(err.message);
    }
});

router.put('/:id/like', isUser(), async (req, res) => {
    try {
        const recipe = await req.storage.likeRecipe(req.params.id, req.user._id);
        recipe._doc.isUser = Boolean(req.user);
        recipe._doc.isOwner = req.user && recipe.owner == req.user._id;
        recipe._doc.hasLiked = req.user && recipe.likedBy.find(u => u._id == req.user._id);

        res.json(recipe);
    } catch (err) {
        console.log(err.message);
        res.status(err.status || 404).json(err.message);
    }
});

router.put('/:id/unlike', isUser(), async (req, res) => {
    try {
        const recipe = await req.storage.unlikeRecipe(req.params.id, req.user._id);
        recipe._doc.isUser = Boolean(req.user);
        recipe._doc.isOwner = req.user && recipe.owner == req.user._id;
        recipe._doc.hasLiked = req.user && recipe.likedBy.find(u => u._id == req.user._id);

        res.json(recipe);
    } catch (err) {
        console.log(err.message);
        res.status(err.status || 404).json(err.message);
    }
});

router.delete('/:id', isUser(), async (req, res) => {
    const recipe = await req.storage.getRecipeById(req.params.id);
    console.log('deleting', recipe);

    if (req.user._id == recipe.owner) {
        try {
            await req.storage.deleteRecipe(req.params.id);
            res.json({});
        } catch (err) {
            console.log(err.message);
            res.status(err.status || 404).json({ message: err.message });
        }
    }
});

module.exports = router;