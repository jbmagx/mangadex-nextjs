type MangaDexListData = {
    result: 'ok' | 'error';
    response: string;
    data: MangaData[];
    limit: number;
    offset: number;
    total: number;
};

type MangaData = {
    id: string;
    type: 'manga';
    attributes: MangaAttributes;
    relationships: Relationship[];
};

type MangaAttributes = {
    title: Record<string, string>;
    altTitles: Array<Record<string, string>>;
    description: Record<string, string>;
    isLocked: boolean;
    links: Record<string, string>;
    originalLanguage: string;
    lastVolume: string;
    lastChapter: string;
    publicationDemographic: 'shounen' | 'shoujo' | 'josei' | 'seinen' | 'none';
    status: 'ongoing' | 'completed' | 'hiatus' | 'cancelled';
    year: number;
    contentRating: 'safe' | 'suggestive' | 'erotica' | 'pornographic';
    chapterNumbersResetOnNewVolume: boolean;
    availableTranslatedLanguages: string[];
    latestUploadedChapter: string;
    tags: Tag[];
    state: 'draft' | 'published';
    version: number;
    createdAt: string;
    updatedAt: string;
};

type Tag = {
    id: string;
    type: 'tag';
    attributes: TagAttributes;
    relationships: Relationship[];
};

type TagAttributes = {
    name: Record<string, string>;
    description: Record<string, string>;
    group: 'content' | 'format' | 'genre' | 'theme';
    version: number;
};

type Relationship = {
    id: string;
    type: string;
    related: string;
    attributes: Record<string, unknown>;
};

type Manga = {
    result: string;
    response: string;
    data: {
        id: string;
        type: string;
        attributes: {
            title: Record<string, string>;
            altTitles: Array<Record<string, string>>;
            description: Record<string, string>;
            isLocked: boolean;
            links: Record<string, string>;
            originalLanguage: string;
            lastVolume: string;
            lastChapter: string;
            publicationDemographic: 'shounen' | 'shoujo' | 'josei' | 'seinen' | string;
            status: 'ongoing' | 'completed' | 'hiatus' | 'cancelled' | string;
            year: number;
            contentRating: 'safe' | 'suggestive' | 'erotica' | 'pornographic' | string;
            chapterNumbersResetOnNewVolume: boolean;
            availableTranslatedLanguages: string[];
            latestUploadedChapter: string;
            tags: Array<{
                id: string;
                type: string;
                attributes: {
                    name: Record<string, string>;
                    description: Record<string, string>;
                    group: string;
                    version: number;
                };
                relationships: Array<{
                    id: string;
                    type: string;
                    related: string;
                    attributes: Record<string, unknown>;
                }>;
            }>;
            state: 'draft' | 'published' | string;
            version: number;
            createdAt: string;
            updatedAt: string;
        };
        relationships: Array<{
            id: string;
            type: string;
            related: string;
            attributes: Record<string, unknown>;
        }>;
    };
};

type Statistics = {
    comments: {
        threadId: number;
        repliesCount: number;
    };
    rating: {
        average: number;
        bayesian: number;
        distribution: Record<'1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10', number>;
    };
    follows: number;
};

type MangaDexStatisticsData = {
    result: string;
    statistics: Record<string, Statistics>;
};

type Chapter = {
    chapter: string;
    id: string;
    others: string[];
    count: number;
};

type Volume = {
    volume: string;
    count: number;
    chapters: Record<string, Chapter>;
};

type MangaAggregate = {
    result: string;
    volumes: Record<string, Volume>;
};

type ChapterImages = {
    result: 'ok' | 'error';
    baseUrl: string;
    chapter: {
        hash: string;
        data: string[];
        dataSaver: string[];
    };
};

type ScanlationGroupAttributes = {
    name: string;
    altNames: string[];
    locked: boolean;
    website: string | null;
    ircServer: string | null;
    ircChannel: string | null;
    discord: string | null;
    contactEmail: string | null;
    description: string;
    twitter: string | null;
    mangaUpdates: string | null;
    focusedLanguages: string[];
    official: boolean;
    verified: boolean;
    inactive: boolean;
    publishDelay: string | null;
    createdAt: string;
    updatedAt: string;
    version: number;
};

type ChapterInfoDataRelationship = {
    id: string;
    type: 'scanlation_group' | 'manga' | 'user';
    attributes?: ScanlationGroupAttributes;
};

type ChapterInfoDataAttributes = {
    volume: string | null;
    chapter: string;
    title: string;
    translatedLanguage: string;
    externalUrl: string | null;
    publishAt: string;
    readableAt: string;
    createdAt: string;
    updatedAt: string;
    pages: number;
    version: number;
};

type ChapterInfoData = {
    id: string;
    type: 'chapter';
    attributes: ChapterInfoDataAttributes;
    relationships: ChapterInfoDataRelationship[];
};

type ChapterInfo = {
    result: string;
    response: 'entity';
    data: ChapterInfoData;
};

type VolumeCheckResult = {
    isComplete: boolean;
    chapterCount: number; // Total chapters including decimal extensions
    realChapterCount: number; // Count of unique whole-number chapters
    expectedChapterCount: number; // The expected number of total chapters (including decimals) if no gaps exist
    missingChapters: number[]; // List of missing whole-number chapters
};
