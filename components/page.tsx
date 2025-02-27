import MangaDexLayout from './components/server/MangaDexLayout';
import Featured from './components/server/Featured';
import LatestUpdates from './components/server/LatestUpdates';
import RecentlyAdded from './components/server/RecentlyAdded';
import Completed from './components/server/Completed';

export default function MangaDex() {
    return (
        <MangaDexLayout>
            <Featured />
            <Completed />
            <LatestUpdates />
            <RecentlyAdded />
        </MangaDexLayout>
    );
}
