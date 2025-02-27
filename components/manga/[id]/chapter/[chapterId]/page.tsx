import Link from 'next/link';
import ChapterHeader from '../../../../components/client/ChapterHeader';
import ChapterImagesContainerAndCounter from '@/app/projects/mangadex/components/client/ChapterImagesContainerAndCounter';
import ChapterControls from '../../../../components/client/ChapterControls';
import ChapterScrollProgress from '../../../../components/client/ChapterScrollProgress';
import ScrollToTop from '@/app/projects/mangadex/components/client/ScrollToTop';

type ChapterProps = {
    params: Promise<{
        id: string;
        chapterId: string;
    }>;
};

// Dynamic metadata
export async function generateMetadata({ params }: ChapterProps) {
    const { id, chapterId } = await params;

    const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.jbmagx.com';

    const mangaResponse = await fetch(`${baseURL}/api/projects/mangadex/manga/${id}`);
    const manga: Manga = await mangaResponse.json();

    const chapterInfoResponse = await fetch(`${baseURL}/api/projects/mangadex/chapter/${chapterId}/info`);
    const chapterInfo: ChapterInfo = await chapterInfoResponse.json();

    const originalLanguage = manga.data.attributes?.originalLanguage;
    const alternativeEnglishLanguage = manga.data.attributes?.altTitles?.find((title) => title.hasOwnProperty('en'))?.en;
    const englishLanguage = manga.data.attributes?.title?.en;
    const japaneseLanguage = manga.data.attributes?.title?.ja;
    const englishDescription = manga.data.attributes?.description?.en;

    return {
        title: `jbmagx | MangaDex | ${originalLanguage === 'ja' && alternativeEnglishLanguage ? alternativeEnglishLanguage : englishLanguage || japaneseLanguage} | Chapter ${
            chapterInfo.data.attributes.chapter
        }`,
        description: englishDescription,
    };
}

export default async function Chapter({ params }: ChapterProps) {
    const { id, chapterId } = await params;

    const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.jbmagx.com';

    const mangaResponse = await fetch(`${baseURL}/api/projects/mangadex/manga/${id}`);
    const manga: Manga = await mangaResponse.json();

    const mangaAggregateResponse = await fetch(`${baseURL}/api/projects/mangadex/manga/${id}/aggregate`);
    const mangaAggregate: MangaAggregate = await mangaAggregateResponse.json();

    const chapterImagesDataResponse = await fetch(`${baseURL}/api/projects/mangadex/chapter/${chapterId}/images`);
    const chapterImagesData: ChapterImages = await chapterImagesDataResponse.json();

    const chapterInfoResponse = await fetch(`${baseURL}/api/projects/mangadex/chapter/${chapterId}/info`);
    const chapterInfo: ChapterInfo = await chapterInfoResponse.json();

    const mangaTitle =
        manga.data.attributes.originalLanguage === 'ja' && manga.data.attributes.altTitles.find((title) => title.hasOwnProperty('en'))?.en
            ? manga.data.attributes.altTitles.find((title) => title.hasOwnProperty('en'))?.en
            : manga.data.attributes.title.en || manga.data.attributes.title.ja;

    let chapterVolume;
    let chapterNumber;

    const chapters: Chapter[] = [];
    Object.keys(mangaAggregate.volumes).map((volumeKey) => {
        const volume = mangaAggregate.volumes[volumeKey];

        Object.keys(volume.chapters).map((chapterKey) => {
            const chapter = volume.chapters[chapterKey];

            chapters.push(chapter);

            if (chapter.id === chapterId) {
                chapterVolume = volume.volume;
                chapterNumber = chapter.chapter;
            }
        });
    });

    const group = chapterInfo.data.relationships.find((relationship) => relationship.type === 'scanlation_group');

    return (
        <div className="flex flex-col w-full">
            {/* Temporary fix for not scrolling to top when changing pages or routes. */}
            <ScrollToTop />
            {/* Temporary fix for not scrolling to top when changing pages or routes. */}

            <ChapterHeader mangaTitle={mangaTitle as string} mangaId={id} chapterNumber={chapterNumber} chapters={chapters} />

            <div className="flex flex-col items-center w-full my-8 px-6">
                <h1 className="text-xl xs:text-lg xxs:text-lg font-medium text-center">Chapter {chapterNumber}</h1>
                <Link href={`/projects/mangadex/manga/${id}`} scroll={false}>
                    <h2 className="text-orange-600 text-center font-medium text-lg xs:text-base xxs:text-base">{mangaTitle}</h2>
                </Link>

                <div className="flex flex-wrap items-center justify-center w-full gap-x-8 mt-4">
                    <div className="flex items-center gap-x-2">
                        <span>Source: </span>
                        <Link href="https://mangadex.org/" target="_blank">
                            <h2 className="text-orange-600 font-medium text-lg xs:text-base xxs:text-base">MangaDex</h2>
                        </Link>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-x-2">
                        <span className="text-nowrap">Translated by: </span>
                        <Link href={group?.attributes?.website || ''} target="_blank">
                            <h2 className="text-orange-600 text-nowrap font-medium text-lg xs:text-base xxs:text-base">{group?.attributes?.name}</h2>
                        </Link>
                    </div>
                </div>
            </div>

            <ChapterImagesContainerAndCounter
                mangaTitle={mangaTitle}
                chapterNumber={chapterNumber}
                baseUrl={chapterImagesData.baseUrl}
                hash={chapterImagesData.chapter.hash}
                images={chapterImagesData.chapter.data}
            />

            <ChapterControls mangaTitle={mangaTitle as string} mangaId={id} currentChapter={chapterNumber} chapters={chapters} />

            <ChapterScrollProgress />
        </div>
    );
}
