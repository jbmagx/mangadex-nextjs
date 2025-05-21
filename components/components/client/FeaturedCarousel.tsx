'use client';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import MangaDexCardImage from '@/app/projects/mangadex/components/server/mangadex-card/MangaDexCardImage';
import MangaDexCardTitle from '@/app/projects/mangadex/components/server/mangadex-card/MangaDexCardTitle';
import MangaDexCardOriginalLanguage from '@/app/projects/mangadex/components/server/mangadex-card/MangaDexCardOriginalLanguage';
import MangaDexCardStatistics from '@/app/projects/mangadex/components/server/mangadex-card/MangaDexCardStatistics';
import MangaDexCardLastUpdate from '@/app/projects/mangadex/components/server/mangadex-card/MangaDexCardLastUpdate';
import MangaDexCardGenresOrThemes from '@/app/projects/mangadex/components/server/mangadex-card/MangaDexCardGenresOrThemes';
import MangaDexCardDescription from '@/app/projects/mangadex/components/server/mangadex-card/MangaDexCardDescription';

type RecentlyAddedCarouselProps = {
    featured: MangaDexGetMangaDataItem[];
};

export default function RecentlyAddedCarousel({ featured }: RecentlyAddedCarouselProps) {
    return (
        <Carousel
            opts={{
                align: 'start',
                loop: true,
            }}
            plugins={[
                Autoplay({
                    delay: 10000,
                }),
            ]}
            className="w-full max-w-5xl"
        >
            <CarouselContent>
                {featured.length > 0 &&
                    featured.map((mangaDexGetMangaDataItem, index) => {
                        const id = mangaDexGetMangaDataItem.id;
                        const coverArtFileName = mangaDexGetMangaDataItem?.relationships?.find((relationship) => relationship.type === 'cover_art')?.attributes?.fileName as
                            | string
                            | undefined;
                        const originalLanguage = mangaDexGetMangaDataItem.attributes.originalLanguage;
                        const altTitles = mangaDexGetMangaDataItem.attributes.altTitles;
                        const englishTitle = mangaDexGetMangaDataItem.attributes.title.en;
                        const japaneseTitle = mangaDexGetMangaDataItem.attributes.title.ja;
                        const status = mangaDexGetMangaDataItem.attributes.status;
                        const updatedAt = mangaDexGetMangaDataItem.attributes.updatedAt;
                        const tags = mangaDexGetMangaDataItem?.attributes?.tags;
                        const description = mangaDexGetMangaDataItem?.attributes?.description?.en;

                        return (
                            <CarouselItem key={index}>
                                <div className="flex flex-col items-center sm:flex-row sm:items-start w-full gap-y-2.5 xs:gap-y-3.5 sm:gap-y-0 sm:gap-x-4 md:gap-x-4 lg:gap-x-5">
                                    <MangaDexCardImage
                                        id={id}
                                        coverArtFileName={coverArtFileName}
                                        originalLanguage={originalLanguage}
                                        altTitles={altTitles}
                                        englishTitle={englishTitle}
                                        japaneseTitle={japaneseTitle}
                                        status={status}
                                        className="w-40 md:w-60 lg:w-64"
                                    />

                                    <div className="flex flex-col justify-start w-full sm:w-[calc(100%-10rem-1rem)] md:w-[calc(100%-15rem-1rem)] lg:w-[calc(100%-16rem-1.25rem)]">
                                        <MangaDexCardTitle
                                            id={id}
                                            originalLanguage={originalLanguage}
                                            altTitles={altTitles}
                                            englishTitle={englishTitle}
                                            japaneseTitle={japaneseTitle}
                                            titleClassName="font-medium text-base sm:text-lg line-clamp-2 sm:line-clamp-1 md:line-clamp-2"
                                        />

                                        <div className="flex items-center gap-x-2 sm:mt-1 mt-0.5 min-h-5">
                                            <MangaDexCardOriginalLanguage originalLanguage={originalLanguage} />
                                            <MangaDexCardStatistics id={id} />
                                        </div>

                                        <MangaDexCardLastUpdate updatedAt={updatedAt} />
                                        <MangaDexCardGenresOrThemes tags={tags} />
                                        <MangaDexCardDescription
                                            description={description}
                                            className="line-clamp-[8] sm:line-clamp-5 md:line-clamp-[8] mt-2 md:mt-4 [&>*]:text-sm"
                                        />
                                    </div>
                                </div>
                            </CarouselItem>
                        );
                    })}
            </CarouselContent>

            <CarouselPrevious className="-top-7.5 left-auto right-12" />
            <CarouselNext className="-top-7.5 right-0" />
        </Carousel>
    );
}
