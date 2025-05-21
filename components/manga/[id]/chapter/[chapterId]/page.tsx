import { Suspense } from 'react';
import { getChapter } from '@/app/projects/mangadex/lib/getChapter';
import Link from 'next/link';
import ScrollToTop from '@/app/projects/mangadex/components/client/ScrollToTop';
import Header from '@/app/projects/mangadex/manga/[id]/chapter/[chapterId]/components/header/Header';
import ChapterImages from './components/chapter-images/ChapterImages';
import ChapterControls from '@/app/projects/mangadex/manga/[id]/chapter/[chapterId]/components/chapter-controls/ChapterControls';
import ChapterScrollProgress from '@/app/projects/mangadex/manga/[id]/chapter/[chapterId]/components/ChapterScrollProgress';
import ChapterLoading from './components/ChapterLoading';

type ChapterProps = {
    params: Promise<{
        id: string;
        chapterId: string;
    }>;
};

// Dynamic metadata
export async function generateMetadata({ params }: ChapterProps) {
    const { chapterId } = await params;

    const chapterData = getChapter(chapterId);
    const chapter = await chapterData;

    const mangaAttributes = chapter.data.relationships.find((relationship) => relationship.type === 'manga')?.attributes as MangaAttributes;

    const originalLanguage = mangaAttributes.originalLanguage;
    const altTitles = mangaAttributes.altTitles;
    const englishTitle = mangaAttributes.title?.en;
    const japaneseTitle = mangaAttributes.title?.ja;

    const title =
        originalLanguage === 'ja' && altTitles.find((title) => title.hasOwnProperty('en'))?.en
            ? altTitles.find((title) => title.hasOwnProperty('en'))?.en
            : englishTitle || japaneseTitle;

    const chapterNumber = chapter.data.attributes.chapter;

    const description = mangaAttributes.description;

    return {
        title: `jbmagx | MangaDex | ${title} | Chapter ${chapterNumber}`,
        description: description,
    };
}

export default async function Chapter({ params }: ChapterProps) {
    const { id, chapterId } = await params;

    const chapterData = getChapter(chapterId);
    const chapter = await chapterData;

    const mangaAttributes = chapter.data.relationships.find((relationship) => relationship.type === 'manga')?.attributes as MangaAttributes;

    const originalLanguage = mangaAttributes.originalLanguage;
    const altTitles = mangaAttributes.altTitles;
    const englishTitle = mangaAttributes.title?.en;
    const japaneseTitle = mangaAttributes.title?.ja;

    const title =
        originalLanguage === 'ja' && altTitles.find((title) => title.hasOwnProperty('en'))?.en
            ? altTitles.find((title) => title.hasOwnProperty('en'))?.en
            : englishTitle || japaneseTitle;

    const currentChapter = chapter.data.attributes.chapter;

    const scanlationGroupAttributes = chapter.data.relationships.find((relationship) => relationship.type === 'scanlation_group')?.attributes as ScanlationGroupAttributes;
    const scanlationGroupName = scanlationGroupAttributes.name;
    const scanlationGroupWebsite = scanlationGroupAttributes.website;

    return (
        <div className="flex flex-col items-center w-full">
            {/* Temporary fix for not scrolling to top when changing pages or routes. */}
            <ScrollToTop />
            {/* Temporary fix for not scrolling to top when changing pages or routes. */}

            <Header title={title} currentChapter={currentChapter} />

            <div className="flex flex-col items-center w-full my-8 px-6">
                <h1 className="font-medium text-lg sm:text-xl text-center">Chapter {currentChapter}</h1>
                <Link href={`/projects/mangadex/manga/${id}`} scroll={false}>
                    <h2 className="font-medium text-base sm:text-lg text-center text-orange-600">{title}</h2>
                </Link>

                <div className="flex flex-wrap items-center justify-center w-full gap-x-8 mt-4">
                    <div className="flex items-center gap-x-2">
                        <span>Source: </span>
                        <Link href="https://mangadex.org/" target="_blank">
                            <h2 className="font-medium text-base sm:text-lg text-center text-orange-600">MangaDex</h2>
                        </Link>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-x-2">
                        <span className="text-nowrap">Translated by: </span>
                        <Link href={scanlationGroupWebsite || ''} target="_blank">
                            <h2 className="font-medium text-base sm:text-lg text-center text-orange-600 text-nowrap">{scanlationGroupName}</h2>
                        </Link>
                    </div>
                </div>
            </div>

            <Suspense fallback={<ChapterLoading message="Loading Images..." />}>
                <ChapterImages title={title} chapterId={chapterId} currentChapter={currentChapter} />
            </Suspense>

            <ChapterControls id={id} currentChapter={currentChapter} />

            <ChapterScrollProgress />
        </div>
    );
}
