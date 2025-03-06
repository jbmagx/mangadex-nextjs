import { baseURL } from './baseUrl';

export async function getManga(id: string): Promise<Manga> {
    const response = await fetch(`${baseURL}/api/projects/mangadex/manga/${id}`);
    return response.json();
}
