module.exports = async (req, res, next) => {
    try {
        const data = await req.storage.getRecipeById(req.params.id);

        if(data) {
            req.data = data;
            next();
        } else {
            const error = new Error('No such ID in the database!');
            error.status = 404;
            throw error;
        }
    } catch (err) {
        res.status(err.status || 400).json({ message: err.message });
    }
};