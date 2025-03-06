import { baseURL } from './baseUrl';

export async function getMangaAggregate(id: string): Promise<MangaAggregate> {
    const response = await fetch(`${baseURL}/api/projects/mangadex/manga/${id}/aggregate`);
    return response.json();
}
