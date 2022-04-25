export interface IRecipe {
    _id: string;
    name: string;
    ingredients: string;
    instructions: string;
    time: number;
    imageUrl: string;
    likedBy: string[];
    // owner: {};
}