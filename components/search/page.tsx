import { Suspense } from 'react';
import MangaDexLayout from '../components/server/MangaDexLayout';
import Loading from './loading';
import SearchResults from '../components/client/SearchResults';

export default function MangaDexSearchPage() {
    return (
        <MangaDexLayout>
            <Suspense fallback={<Loading />}>
                <SearchResults />
            </Suspense>
        </MangaDexLayout>
    );
}
