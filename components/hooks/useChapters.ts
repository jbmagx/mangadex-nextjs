import { useEffect, useState } from 'react';

export default function useChapters(id: string) {
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    useEffect(() => {
        const getMangaAggregate = async () => {
            setIsFetching(true);

            try {
                const response = await fetch(`/api/projects/mangadex/manga/${id}/aggregate`);
                if (!response.ok) throw new Error('Failed to fetch data.');

                const mangaDexGetMangaIdAggregateResponse: MangaDexGetMangaIdAggregateResponse = await response.json();

                const chapters: Chapter[] = [];

                Object.keys(mangaDexGetMangaIdAggregateResponse.volumes).map((volumeKey) => {
                    const volume = mangaDexGetMangaIdAggregateResponse.volumes[volumeKey];

                    Object.keys(volume.chapters).map((chapterKey) => {
                        const chapter = volume.chapters[chapterKey];
                        chapters.push(chapter);
                    });
                });

                setChapters(chapters);
            } catch (error) {
                console.error(error);
            } finally {
                setIsFetching(false);
            }
        };

        getMangaAggregate();
    }, []);

    return {
        isFetching,
        chapters,
    };
}
