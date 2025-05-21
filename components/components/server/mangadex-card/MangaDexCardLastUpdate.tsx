import { formatDate } from '@/lib/utils';
import { calculateTimePassed } from '@/lib/calculateTimePassed';

type MangaDexCardLastUpdateProps = {
    updatedAt: string;
};

export default function MangaDexCardLastUpdate({ updatedAt }: MangaDexCardLastUpdateProps) {
    const lastUpdate = formatDate(updatedAt, { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
    const timePassed = calculateTimePassed(updatedAt);

    return (
        <p className="text-xs text-muted-foreground mt-1 line-clamp-1 md:line-clamp-none">
            Last update: {lastUpdate} &#8226; {timePassed}
        </p>
    );
}
