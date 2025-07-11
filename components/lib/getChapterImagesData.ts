import { baseURL } from './baseUrl';

export async function getChapterImagesData(chapterId: string): Promise<MangaDexGetAtHomeServerChapterIdResponse> {
    const response = await fetch(`${baseURL}/api/projects/mangadex/chapter/${chapterId}/images`);
    return response.json();
}
