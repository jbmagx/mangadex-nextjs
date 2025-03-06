import { baseURL } from './baseUrl';

export async function getMangaStatistics(id: string): Promise<MangaDexStatisticsData> {
    const response = await fetch(`${baseURL}/api/projects/mangadex/manga/${id}/statistics`);
    return response.json();
}
