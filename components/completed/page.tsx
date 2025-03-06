import type { Metadata } from 'next';
import { Suspense } from 'react';
import MangaDexLayout from '../components/server/MangaDexLayout';
import Loading from './loading';
import OriginalLanguageFilter from '../components/client/OriginalLanguageFilter';
import CompletedResults from '../components/server/CompletedResults';
import CompletedPagination from '../components/client/CompletedPagination';

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

    const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.jbmagx.com';

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
    const completedResults = await completedResultsResponse.json();

    const completedResultsStatistics = [];
    for (let loop = 0; loop < completedResults.data.length; loop++) {
        const completedResultStatisticsResponse = await fetch(`${baseURL}/api/projects/mangadex/manga/${completedResults.data[loop].id}/statistics`, {
            next: {
                revalidate: 3600, // 1 hour
            },
        });
        if (!completedResultStatisticsResponse.ok) continue;
        const completedResultStatistics = await completedResultStatisticsResponse.json();
        completedResultsStatistics.push(completedResultStatistics.statistics);
    }

    return (
        <MangaDexLayout>
            <Suspense fallback={<Loading />}>
                <OriginalLanguageFilter />

                <CompletedResults completedResults={completedResults} completedResultsStatistics={completedResultsStatistics} />

                <CompletedPagination
                    currentPage={page ? parseInt(page) : 1}
                    totalPages={Math.ceil(completedResults.total / limit) > 999 ? 999 : Math.ceil(completedResults.total / limit)}
                />
            </Suspense>
        </MangaDexLayout>
    );
}
