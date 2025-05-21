import { Suspense } from 'react';
import { baseURL } from '@/app/projects/mangadex/constants/base-url';
import Loading from './loading';
import MangaDexLayout from '@/app/projects/mangadex/components/server/mangadex-layout/MangaDexLayout';
import SearchResults from '@/app/projects/mangadex/components/server/SearchResults';
import SearchPagination from '@/app/projects/mangadex/components/client/SearchPagination';
import OriginalLanguageFilter from '@/app/projects/mangadex/components/client/OriginalLanguageFilter';

export default async function MangaDexSearchPage({ searchParams }: { searchParams: Promise<{ q: string; page: string; originalLanguage: string }> }) {
    const { q, page, originalLanguage } = await searchParams;

    if (!q || !page) throw new Error('Missing required search params.');

    const limit = 10;

    const offset = (page ? parseInt(page) - 1 : 1 - 1) * limit;

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

    return (
        <MangaDexLayout>
            <Suspense fallback={<Loading />}>
                <OriginalLanguageFilter />

                {/* Spacer */}
                <div className="py-3" />

                <SearchResults searchResults={searchResults} />

                {/* Spacer */}
                <div className="py-5" />

                <SearchPagination
                    currentPage={page ? parseInt(page) : 1}
                    totalPages={Math.ceil(searchResults.total / limit) > 999 ? 999 : Math.ceil(searchResults.total / limit)}
                    query={q}
                />
            </Suspense>
        </MangaDexLayout>
    );
}
