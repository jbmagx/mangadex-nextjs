import { Suspense } from 'react';
import MangaDexLayout from '../components/server/MangaDexLayout';
import Loading from './loading';
import SearchResults from '../components/server/SearchResults';
import SearchPagination from '@/app/projects/mangadex/components/client/SearchPagination';
import OriginalLanguageFilter from '../components/client/OriginalLanguageFilter';

export default async function MangaDexSearchPage({ searchParams }: { searchParams: Promise<{ q: string; page: string; originalLanguage: string }> }) {
    const { q, page, originalLanguage } = await searchParams;

    if (!q || !page) throw new Error('Missing required search params.');

    const limit = 10;

    const offset = (page ? parseInt(page) - 1 : 1 - 1) * limit;

    const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.jbmagx.com';

    const searchResultsResponse = await fetch(
        `${baseURL}/api/projects/mangadex/search?query=${q}&limit=${limit}&offset=${offset}${originalLanguage?.includes('ja') ? '&originalLanguage=ja' : ''}${
            originalLanguage?.includes('ko') ? '&originalLanguage=ko' : ''
        }${originalLanguage?.includes('zh') ? '&originalLanguage=zh' : ''}`,
        {
            next: {
                revalidate: 3600, // 1 hour
            },
        }
    );
    if (!searchResultsResponse.ok) throw new Error('Oops! Something went wrong while fetching the results. Please try again.');
    const searchResults = await searchResultsResponse.json();

    const searchResultsStatistics = [];
    for (let loop = 0; loop < searchResults.data.length; loop++) {
        const searchResultStatisticsResponse = await fetch(`${baseURL}/api/projects/mangadex/manga/${searchResults.data[loop].id}/statistics`, {
            next: {
                revalidate: 3600, // 1 hour
            },
        });
        if (!searchResultStatisticsResponse.ok) continue;
        const searchResultStatistics = await searchResultStatisticsResponse.json();
        searchResultsStatistics.push(searchResultStatistics.statistics);
    }

    return (
        <MangaDexLayout>
            <Suspense fallback={<Loading />}>
                <OriginalLanguageFilter />

                <SearchResults searchResults={searchResults} searchResultsStatistics={searchResultsStatistics} />

                <SearchPagination
                    currentPage={page ? parseInt(page) : 1}
                    totalPages={Math.ceil(searchResults.total / limit) > 999 ? 999 : Math.ceil(searchResults.total / limit)}
                    query={q}
                />
            </Suspense>
        </MangaDexLayout>
    );
}
