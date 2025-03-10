import { Media } from "./payload-types";

export type PaginatedDocs<T = any> = {
    docs: T[];
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage?: null | number | undefined;
    page?: number;
    pagingCounter: number;
    prevPage?: null | number | undefined;
    totalDocs: number;
    totalPages: number;
};

export type CreateResponse<T> = {
    message: string,
    doc: T,
}


export function isMedia(obj: unknown) : obj is Media {
    if (!obj) {
        return false;
    }
    if (typeof obj === 'string') {
        return false;
    }
    if (typeof obj !== 'object') {
        return false;
    }
    const mediaObj = obj as Record<string, any>;
    return mediaObj?.url && mediaObj?.id;
} 