export interface StrapiImage {
    id: number;
    url: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats?: {
        thumbnail?: { url: string; width: number; height: number; };
        small?: { url: string; width: number; height: number; };
        medium?: { url: string; width: number; height: number; };
        large?: { url: string; width: number; height: number; };
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    createdAt: string;
    updatedAt: string;

}


export interface StrapiGigResponse {
    data: Array<{
        id: number;
        gigTitle: string;
        gigStartDate: string;
        gigLocation: string;
        gigLink?: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    }>;
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}