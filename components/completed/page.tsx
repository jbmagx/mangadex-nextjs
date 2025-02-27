import type { Metadata } from 'next';
import { Suspense } from 'react';
import MangaDexLayout from '../components/server/MangaDexLayout';
import Loading from './loading';
import CompletedResults from '../components/client/CompletedResults';

export const metadata: Metadata = {
    title: 'jbmagx | MangaDex | Completed manga, manhwa, and manhua.',
    icons: {
        icon: '/images/svg/jbmagx-icon.svg',
    },
    description: 'jbmagx MangaDex — Completed manga, manhwa, and manhua.',
};

export default function Completed() {
    return (
        <MangaDexLayout>
            <Suspense fallback={<Loading />}>
                <CompletedResults />
            </Suspense>
        </MangaDexLayout>
    );
}
