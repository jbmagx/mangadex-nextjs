import { baseURL } from '@/app/projects/mangadex/constants/base-url';
import ImagesContainerAndCounter from './components/ImagesContainerAndCounter';

async function getChapterImages(chapterId: string) {
    const response = await fetch(`${baseURL}/api/projects/mangadex/chapter/${chapterId}/images`);
    if (!response.ok) throw new Error('Failed to fetch data.');
    return response.json();
}

type ChapterImagesProps = {
    title?: string;
    chapterId: string;
    currentChapter: string;
};

export default async function ChapterImages({ title, chapterId, currentChapter }: ChapterImagesProps) {
    const chapterImagesData = getChapterImages(chapterId);
    const chapterImages: MangaDexGetAtHomeServerChapterIdResponse = await chapterImagesData;

    const imagesBaseUrl = chapterImages.baseUrl;
    const hash = chapterImages.chapter.hash;
    const images = chapterImages.chapter.data;

    return <ImagesContainerAndCounter title={title} currentChapter={currentChapter} baseUrl={imagesBaseUrl} hash={hash} images={images} />;
}
