export interface Recipe {
    id: string;
    title: string;
    description: string;
    imagePath: string;
}

export function toRecipe(doc): Recipe {
    return {id: doc.id, ...doc.data()};
}