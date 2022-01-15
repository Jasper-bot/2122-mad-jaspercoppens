export interface Comment {
    id?: string,
    uploaderId?: string,
    comment?: string,
    name?: string,
    downloadURL?: string,
    storageId?: string
}

export function toComment(doc): Comment {
    return {id: doc.id, ...doc.data()}
}