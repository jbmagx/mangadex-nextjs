import { baseURL } from './baseUrl';

export async function getChapterInfo(chapterId: string): Promise<ChapterInfo> {
    const response = await fetch(`${baseURL}/api/projects/mangadex/chapter/${chapterId}/info`);
    return response.json();
}
