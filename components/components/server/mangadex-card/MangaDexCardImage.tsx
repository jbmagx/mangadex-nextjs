import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { capitalize, cn } from '@/lib/utils';

type MangaDexCardImageProps = {
    id: string;
    coverArtFileName?: string;
    originalLanguage: string;
    altTitles: Record<string, string>[];
    englishTitle: string;
    japaneseTitle: string;
    status?: 'ongoing' | 'completed' | 'hiatus' | 'cancelled';
    withStatus?: boolean;
    className?: string;
};

export default function MangaDexCardImage({
    id,
    coverArtFileName,
    originalLanguage,
    altTitles,
    englishTitle,
    japaneseTitle,
    status = 'ongoing',
    withStatus = true,
    className,
}: MangaDexCardImageProps) {
    const title =
        originalLanguage === 'ja' && altTitles.find((title) => title.hasOwnProperty('en'))?.en
            ? altTitles.find((title) => title.hasOwnProperty('en'))?.en
            : englishTitle || japaneseTitle;

    return (
        <Link
            href={`/projects/mangadex/manga/${id}`}
            className={cn('relative flex items-center justify-center rounded-xl shadow-sm hover:opacity-80 duration-300 aspect-[7/10]', className)}
            scroll={false}
        >
            <Image
                src={coverArtFileName ? `https://mangadex.org/covers/${id}/${coverArtFileName}.512.jpg` : '/images/png/fallback.png'}
                alt={`${title} Cover`}
                fill={true}
                priority={true}
                sizes="33vw"
                style={{
                    objectFit: 'cover',
                    borderRadius: '12px',
                    border: '1px solid hsl(var(--border))',
                }}
            />

            {withStatus && (
                <Badge
                    className={`absolute bottom-2 right-2 rounded-lg select-none font-medium w-fit border-0 duration-300 py-0 text-[0.6875rem] xs:text-xs h-5 xs:h-6 px-1.5 md:px-1.5 ${
                        status === 'completed'
                            ? 'bg-green-600 hover:bg-green-600/80'
                            : status === 'ongoing'
                            ? 'bg-blue-600 hover:bg-blue-600/80'
                            : status === 'hiatus'
                            ? 'bg-orange-600 hover:bg-orange-600/80'
                            : 'bg-red-600 hover:bg-red-600/80'
                    }`}
                >
                    {capitalize(status)}
                </Badge>
            )}
        </Link>
    );
}
