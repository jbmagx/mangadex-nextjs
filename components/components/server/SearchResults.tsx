import MangaDexCardImage from './mangadex-card/MangaDexCardImage';
import MangaDexCardTitle from './mangadex-card/MangaDexCardTitle';
import MangaDexCardOriginalLanguage from './mangadex-card/MangaDexCardOriginalLanguage';
import MangaDexCardStatistics from './mangadex-card/MangaDexCardStatistics';
import MangaDexCardLastUpdate from './mangadex-card/MangaDexCardLastUpdate';
import MangaDexCardGenresOrThemes from './mangadex-card/MangaDexCardGenresOrThemes';
import MangaDexCardDescription from './mangadex-card/MangaDexCardDescription';

type SearchResultsProps = {
    searchResults: MangaDexGetMangaResponse;
};

export default function SearchResults({ searchResults }: SearchResultsProps) {
    return (
        searchResults && (
            <div className="flex flex-col w-full gap-y-4 md:gap-y-6">
                {searchResults.data.length > 0 ? (
                    searchResults.data.map((mangaDexGetMangaDataItem, index) => {
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
                            <div key={index} className="flex items-start w-full gap-x-4 md:gap-x-6">
                                <MangaDexCardImage
                                    id={id}
                                    coverArtFileName={coverArtFileName}
                                    originalLanguage={originalLanguage}
                                    altTitles={altTitles}
                                    englishTitle={englishTitle}
                                    japaneseTitle={japaneseTitle}
                                    status={status}
                                    className="w-24 xs:w-28 sm:w-32 md:w-56"
                                />

                                <div className="flex flex-col w-[calc(100%-6rem-1rem)] xs:w-[calc(100%-7rem-1rem)] sm:w-[calc(100%-8rem-1rem)] md:w-[calc(100%-14rem-1.5rem)]">
                                    <MangaDexCardTitle
                                        id={id}
                                        originalLanguage={originalLanguage}
                                        altTitles={altTitles}
                                        englishTitle={englishTitle}
                                        japaneseTitle={japaneseTitle}
                                        titleClassName="font-medium text-sm sm:text-[0.9375rem] line-clamp-1 xs:line-clamp-2"
                                    />

                                    <div className="flex items-center gap-x-2 mt-0.5 sm:mt-1 md:mt-0.5 min-h-5">
                                        <MangaDexCardOriginalLanguage originalLanguage={originalLanguage} />
                                        <MangaDexCardStatistics id={id} />
                                    </div>

                                    <MangaDexCardLastUpdate updatedAt={updatedAt} />
                                    <MangaDexCardGenresOrThemes tags={tags} />
                                    <MangaDexCardDescription description={description} className="line-clamp-4 md:line-clamp-[7] mt-2 md:mt-2.5 [&>*]:text-xs sm:[&>*]:text-sm" />
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="flex flex-col items-center w-full my-20">
                        <p className="text-medium text-muted-foreground">No results found.</p>
                    </div>
                )}
            </div>
        )
    );
}
