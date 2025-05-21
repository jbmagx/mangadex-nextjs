import MangaDexLayout from './components/server/mangadex-layout/MangaDexLayout';
import Featured from './components/server/Featured';
import LatestUpdates from './components/server/latest-updates/LatestUpdates';
import RecentlyAdded from './components/server/RecentlyAdded';
import Completed from './components/server/completed/Completed';

export default function MangaDex() {
    return (
        <MangaDexLayout>
            <Featured />

            {/* Spacer */}
            <div className="py-4" />

            <Completed />

            {/* Spacer */}
            <div className="py-4" />

            <LatestUpdates />

            {/* Spacer */}
            <div className="py-5" />

            <RecentlyAdded />
        </MangaDexLayout>
    );
}
