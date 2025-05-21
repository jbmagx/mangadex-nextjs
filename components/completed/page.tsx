import type { Metadata } from 'next';
import { Suspense } from 'react';
import { baseURL } from '@/app/projects/mangadex/constants/base-url';
import Loading from './loading';
import MangaDexLayout from '@/app/projects/mangadex/components/server/mangadex-layout/MangaDexLayout';
import OriginalLanguageFilter from '@/app/projects/mangadex/components/client/OriginalLanguageFilter';
import CompletedResults from '@/app/projects/mangadex/components/server/CompletedResults';
import CompletedPagination from '@/app/projects/mangadex/components/client/CompletedPagination';

export const metadata: Metadata = {
    title: 'jbmagx | MangaDex | Completed manga, manhwa, and manhua.',
    icons: {
        icon: '/images/svg/jbmagx-icon.svg',
    },
    description: 'jbmagx MangaDex — Completed manga, manhwa, and manhua.',
};

export default async function Completed({ searchParams }: { searchParams: Promise<{ q: string; page: string; originalLanguage: string }> }) {
    const { page, originalLanguage } = await searchParams;

    if (!page) throw new Error('Missing required search params.');

    const limit = 10;

    const offset = (page ? parseInt(page) - 1 : 1 - 1) * limit;

    const completedResultsResponse = await fetch(
        `${baseURL}/api/projects/mangadex/completed?limit=${limit}&offset=${offset}${originalLanguage?.includes('ja') ? '&originalLanguage=ja' : ''}${
            originalLanguage?.includes('ko') ? '&originalLanguage=ko' : ''
        }${originalLanguage?.includes('zh') ? '&originalLanguage=zh' : ''}`,
        {
            next: {
                revalidate: 3600, // 1 hour
            },
        }
    );

    if (!completedResultsResponse.ok) throw new Error('Oops! Something went wrong while fetching the results. Please try again.');

    const completedResults: MangaDexGetMangaResponse = await completedResultsResponse.json();

    return (
        <MangaDexLayout>
            <Suspense fallback={<Loading />}>
                <OriginalLanguageFilter />

                {/* Spacer */}
                <div className="py-3" />

                <CompletedResults completedResults={completedResults} />

                {/* Spacer */}
                <div className="py-5" />

                <CompletedPagination
                    currentPage={page ? parseInt(page) : 1}
                    totalPages={Math.ceil(completedResults.total / limit) > 999 ? 999 : Math.ceil(completedResults.total / limit)}
                />
            </Suspense>
        </MangaDexLayout>
    );
}
