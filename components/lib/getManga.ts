import { baseURL } from '@/app/projects/mangadex/constants/base-url';

export async function getManga(id: string): Promise<MangaDexGetMangaIdResponse> {
    const response = await fetch(`${baseURL}/api/projects/mangadex/manga/${id}`);
    if (!response.ok) throw new Error('Failed to fetch data.');
    return response.json();
}
