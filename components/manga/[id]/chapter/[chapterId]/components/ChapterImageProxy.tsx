'use client';

import { Dispatch, SetStateAction } from 'react';
import { rgbDataURL } from '@/app/projects/mangadex/lib/rgbDataURL';
import Image from 'next/image';
import ChapterLoading from './ChapterLoading';
import useChapterImageProxy from '@/app/projects/mangadex/hooks/useChapterImageProxy';

type ChapterImageProxyProps = {
    title?: string;
    currentChapter: string;
    imageUrl: string;
    index: number;
    setNumberOfImagesLoaded: Dispatch<SetStateAction<number>>;
};

export default function ChapterImageProxy({ title, currentChapter, imageUrl, index, setNumberOfImagesLoaded }: ChapterImageProxyProps) {
    const { proxiedUrl, isLoading, dimensions, reloadKey, hasError, handleError, handleRetry } = useChapterImageProxy(index, imageUrl);

    if (isLoading) return <ChapterLoading message={`Loading page ${index + 1}`} />;

    return (
        <div className="flex flex-col items-center justify-center w-full select-none">
            {hasError ? (
                <div className="flex flex-col items-center border-2 py-4 px-6 my-8 rounded-xl">
                    <p className="text-sm text-orange-600 mb-2">Failed to load image.</p>
                    <button
                        onClick={handleRetry}
                        className="flex items-center justify-center text-white text-sm font-semibold min-w-20 h-9 px-4 bg-orange-600 hover:bg-orange-600/90 duration-300 rounded-full"
                    >
                        Retry
                    </button>
                </div>
            ) : (
                <Image
                    key={reloadKey}
                    priority={true}
                    onLoad={() => setNumberOfImagesLoaded((prev) => prev + 1)}
                    onError={handleError}
                    src={proxiedUrl}
                    alt={`${title} - Chapter ${currentChapter} - page ${index + 1}`}
                    width={dimensions.width}
                    height={dimensions.height}
                    style={{ objectFit: 'contain', userSelect: 'none', WebkitUserSelect: 'none', WebkitTouchCallout: 'none' }}
                    quality={100}
                    placeholder="blur"
                    blurDataURL={rgbDataURL(46, 65, 74)}
                    loading="eager"
                />
            )}
        </div>
    );
}
