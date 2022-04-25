export interface IUser {
    _id: string;
    email: string;
    username: string;
    recipes: string[];
    likedRecipes: string[];
    token: string;
}