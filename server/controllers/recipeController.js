const router = require('express').Router();
const { isUser } = require('../middlewares/guards');

router.get('/', async (req, res) => {
    console.log('in recipe controller');
    const recipes = await req.storage.getAllRecipes();
    res.json(recipes);
});

router.post('/', isUser(), async (req, res) => {
    const recipeData = {
        name: req.body.recipeName,
        ingredients: req.body.ingredients,
        directions: req.body.directions,
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
        console.log('recipeController', recipe);

        res.json(recipe);
    } catch (err) {
        console.log(err.message);
        res.status(404).json(err.message);
    }
});

router.get('/edit/:id', isUser(), async (req, res) => {
    try {
        const recipe = await req.storage.getRecipeById(req.params.id);

        if (recipe.owner != req.user._id) {
            throw new Error('You cannot edit a recipe that you haven\'t created!');
        }

        res.json({ title: 'Edit Recipe', recipe });
    } catch (err) {
        console.log(err.message);
        redirect('/');
    }
});

router.post('/edit/:id', isUser(), async (req, res) => {
    try {
        const recipe = await req.storage.getRecipeById(req.params.id);

        if (recipe.owner != req.user._id) {
            throw new Error('You cannot edit a recipe that you haven\'t created!');
        }

        await req.storage.editRecipe(req.params.id, req.body);
        res.redirect('/');
    } catch (err) {
        console.log(err.message);

        let errors;

        if (err.errors) {
            errors = Object.values(err.errors).map(e => e.properties.message);
        } else {
            errors = [err.message];
        }

        const ctx = {
            errors,
            recipe: {
                _id: req.params.id,
                name: req.body.name,
                ingredients: req.body.ingredients,
                directions: req.body.directions,
                imageUrl: req.body.imageUrl,
            }
        };

        res.json(ctx);
    }
});

router.get('/like/:id', isUser(), async (req, res) => {
    try {
        await req.storage.likeRecipe(req.params.id, req.user._id);
        res.redirect(`/recipes/details/${req.params.id}`);
    } catch (err) {
        console.log(err.message);
        res.redirect('/');
    }

    res.redirect(`/recipes/details/${hotel._id}`);
});

router.get('/delete/:id', isUser(), async (req, res) => {
    const recipe = await req.storage.getRecipeById(req.params.id);

    if (req.user._id == recipe.owner) {
        try {
            await req.storage.deleteRecipe(req.params.id);
        } catch (err) {
            console.log(err.message);
        }
    }

    res.redirect('/');
});

module.exports = router;