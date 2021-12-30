export interface Comment {
    id?: string,
    comment?: string,
    name?: string,
    downloadURL?: string
}

export function toComment(doc): Comment {
    return { ...doc.data()}
}