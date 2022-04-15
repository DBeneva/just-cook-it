export interface IRecipe {
    likedBy: string[];
    _id: string;
    recipeName: string;
    userId: {
        recipes: string[],
        likedRecipes: string[],
        _id: string,
        email: string,
        username: string, 
        password: string,
        created_at: string,
        updatedAt: string,
        __v: number
    };
    created_at: string;
    updatedAt: string;
    __v: number;
}