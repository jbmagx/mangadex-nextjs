'use client';

import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import { showSuccessfullyLoadedAllImagesToast } from '@/app/projects/mangadex/lib/mangadexToasts';
import ChapterImageProxy from '@/app/projects/mangadex/manga/[id]/chapter/[chapterId]/components/ChapterImageProxy';

type ImagesContainerAndCounterProps = {
    title?: string;
    currentChapter: string;
    baseUrl: string;
    hash: string;
    images: string[];
};

export default function ImagesContainerAndCounter({ title, currentChapter, baseUrl, hash, images }: ImagesContainerAndCounterProps) {
    const [numberOfImagesLoaded, setNumberOfImagesLoaded] = useState<number>(0);

    useEffect(() => {
        if (images.length === numberOfImagesLoaded) {
            showSuccessfullyLoadedAllImagesToast();
        }
    }, [numberOfImagesLoaded]);

    return (
        <>
            {images.length === 0 ? (
                <div className="flex flex-col items-center w-full px-6 my-20">
                    <p className="text-red-600 font-medium">Chapter empty. No images to load.</p>
                </div>
            ) : (
                <div className="flex flex-col items-center w-full border-t-1">
                    {images.map((image, index) => (
                        <ChapterImageProxy
                            key={index}
                            title={title}
                            currentChapter={currentChapter}
                            imageUrl={`${baseUrl}/data/${hash}/${image}`}
                            index={index}
                            setNumberOfImagesLoaded={setNumberOfImagesLoaded}
                        />
                    ))}
                </div>
            )}

            <Toaster richColors position="top-center" />
        </>
    );
}
