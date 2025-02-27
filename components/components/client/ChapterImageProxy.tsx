'use client';

import { useState, useCallback, useEffect, Dispatch, SetStateAction } from 'react';
import { toast } from 'sonner';
import { CircleAlert } from 'lucide-react';
import Image from 'next/image';
import Loading from '@/app/loading';

type ChapterImageProxyProps = {
    mangaTitle?: string;
    chapterNumber?: number;
    imageUrl: string;
    index: number;
    setNumberOfImagesLoaded: Dispatch<SetStateAction<number>>;
};

export default function ChapterImageProxy({ mangaTitle, chapterNumber, imageUrl, index, setNumberOfImagesLoaded }: ChapterImageProxyProps) {
    const proxiedUrl = `/api/projects/mangadex/image?url=${imageUrl}`;

    const [hasError, setHasError] = useState(false);
    const [reloadKey, setReloadKey] = useState(0);

    const handleRetry = useCallback(() => {
        setHasError(false);
        setReloadKey((prev) => prev + 1); // Change the key to force re-render
    }, []);

    const handleError = useCallback(() => {
        setHasError(true);
        toast.error(
            <div className="flex items-center w-[356px] gap-x-2.5">
                <CircleAlert size={18} fill="#dc2626" stroke="#ffffff" />
                <span className="w-[calc(100%-18px-10px)] font-semibold text-white">Failed to load page {index + 1}</span>
            </div>,
            {
                style: {
                    backgroundColor: '#dc2626',
                    border: '#dc2626',
                },
            }
        );
    }, []);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const img = new window.Image();
        img.src = proxiedUrl;

        // Once the image is loaded, set its dimensions
        img.onload = () => {
            setDimensions({ width: img.width, height: img.height });
            setIsLoading(false);
        };

        // Cleanup
        return () => {
            img.onload = null;
        };
    }, [imageUrl]);

    if (isLoading) return <Loading />;

    const keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    const triplet = (e1: number, e2: number, e3: number) =>
        keyStr.charAt(e1 >> 2) + keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) + keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) + keyStr.charAt(e3 & 63);

    const rgbDataURL = (r: number, g: number, b: number) => `data:image/gif;base64,R0lGODlhAQABAPAA${triplet(0, r, g) + triplet(b, 255, 255)}/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

    const onLoad = () => setNumberOfImagesLoaded((prev) => prev + 1);

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
                    onLoad={onLoad}
                    onError={handleError}
                    src={proxiedUrl}
                    alt={`${mangaTitle} - Chapter ${chapterNumber} - page ${index + 1}`}
                    width={dimensions.width}
                    height={dimensions.height}
                    style={{ objectFit: 'contain' }}
                    quality={100}
                    placeholder="blur"
                    blurDataURL={rgbDataURL(46, 65, 74)}
                />
            )}
        </div>
    );
}
