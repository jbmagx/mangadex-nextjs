import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { baseURL } from '@/app/projects/mangadex/constants/base-url';
import { getManga } from '@/app/projects/mangadex/lib/getManga';
import MangaDexLayout from '@/app/projects/mangadex/components/server/mangadex-layout/MangaDexLayout';
import MangaDexCardImage from '@/app/projects/mangadex/components/server/mangadex-card/MangaDexCardImage';
import MangaDexCardTitle from '@/app/projects/mangadex/components/server/mangadex-card/MangaDexCardTitle';
import MangaDexCardOriginalLanguage from '@/app/projects/mangadex/components/server/mangadex-card/MangaDexCardOriginalLanguage';
import MangaDexCardStatistics from '@/app/projects/mangadex/components/server/mangadex-card/MangaDexCardStatistics';
import MangaDexCardLastUpdate from '@/app/projects/mangadex/components/server/mangadex-card/MangaDexCardLastUpdate';
import MangaDexCardDescription from '@/app/projects/mangadex/components/server/mangadex-card/MangaDexCardDescription';
import Author from './components/Author';
import Artist from './components/Artist';
import Genres from './components/Genres';
import Themes from './components/Themes';
import Format from './components/Format';
import Chapters from './components/Chapters';

// Dynamic metadata
export async function generateMetadata({ params }: MangaProps) {
    const { id } = await params;

    const mangaData = getManga(id);
    const manga = await mangaData;

    const relationships = manga.data.relationships;
    const coverArtFileName = relationships?.find((relationship) => relationship.type === 'cover_art')?.attributes?.fileName as string | undefined;
    const originalLanguage = manga.data.attributes?.originalLanguage;
    const altTitles = manga.data.attributes.altTitles;
    const englishTitle = manga.data.attributes?.title?.en;
    const japaneseTitle = manga.data.attributes?.title?.ja;

    const title =
        originalLanguage === 'ja' && altTitles.find((title) => title.hasOwnProperty('en'))?.en
            ? altTitles.find((title) => title.hasOwnProperty('en'))?.en
            : englishTitle || japaneseTitle;

    const description = manga.data.attributes?.description?.en;

    return {
        metadataBase: new URL(baseURL),
        title: `jbmagx | MangaDex | ${title}`,
        description: description,
        openGraph: {
            images: [`https://mangadex.org/covers/${id}/${coverArtFileName}.512.jpg`],
        },
    };
}

type MangaProps = {
    params: Promise<{ id: string }>;
};

export default async function Manga({ params }: MangaProps) {
    const { id } = await params;

    const mangaData = getManga(id);
    const manga = await mangaData;

    if (!manga.data) throw new Error('Manga data not found.');

    const relationships = manga.data.relationships;
    const coverArtFileName = relationships?.find((relationship) => relationship.type === 'cover_art')?.attributes?.fileName as string | undefined;
    const originalLanguage = manga.data.attributes?.originalLanguage;
    const altTitles = manga.data.attributes.altTitles;
    const englishTitle = manga.data.attributes?.title?.en;
    const japaneseTitle = manga.data.attributes?.title?.ja;
    const updatedAt = manga.data.attributes?.updatedAt;
    const tags = manga.data.attributes?.tags;
    const description = manga.data.attributes?.description?.en;

    return (
        <MangaDexLayout>
            <div className="flex flex-col w-full">
                <div className="flex flex-wrap md:flex-nowrap items-start justify-center md:justify-start w-full gap-y-3.5 sm:gap-y-4 md:gap-x-6">
                    <MangaDexCardImage
                        id={id}
                        coverArtFileName={coverArtFileName}
                        originalLanguage={originalLanguage}
                        altTitles={altTitles}
                        englishTitle={englishTitle}
                        japaneseTitle={japaneseTitle}
                        className="w-40 xs:w-44 sm:w-48 md:w-56"
                    />

                    <div className="flex flex-col items-start w-full md:w-[calc(100%-14rem-1.5rem)]">
                        <MangaDexCardTitle
                            id={id}
                            originalLanguage={originalLanguage}
                            altTitles={altTitles}
                            englishTitle={englishTitle}
                            japaneseTitle={japaneseTitle}
                            titleClassName="font-semibold"
                        />

                        <div className="flex items-center gap-x-2 mt-0.5 sm:mt-1 md:mt-0.5">
                            <MangaDexCardOriginalLanguage originalLanguage={originalLanguage} />
                            <MangaDexCardStatistics id={id} />
                        </div>

                        <MangaDexCardLastUpdate updatedAt={updatedAt} />

                        <div className="flex flex-col w-full gap-y-1.5 mt-2.5 sm:mt-3 md:mt-4">
                            <Author relationships={relationships} />
                            <Artist relationships={relationships} />
                            <Genres tags={tags} />
                            <Themes tags={tags} />
                            <Format tags={tags} />
                        </div>
                    </div>
                </div>

                <MangaDexCardDescription description={description} className="mt-3.5 sm:mt-4 md:mt-6 [&>*]:text-sm [&>hr]:my-4" />

                {/* Spacer */}
                <div className="py-3" />

                <Suspense
                    fallback={
                        <div className="flex items-center gap-x-2 text-orange-600 text-sm font-medium">
                            <Loader2 size={16} className="animate-spin" />
                            Loading Chapters...
                        </div>
                    }
                >
                    <Chapters id={id} />
                </Suspense>
            </div>
        </MangaDexLayout>
    );
}
