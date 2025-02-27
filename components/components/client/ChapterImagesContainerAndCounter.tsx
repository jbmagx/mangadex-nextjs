'use client';

import { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';
import { CircleCheck } from 'lucide-react';
// import ChapterImage from './ChapterImage';
import ChapterImageProxy from './ChapterImageProxy';

type ChapterImagesContainerAndCounterProps = {
    mangaTitle?: string;
    chapterNumber?: number;
    baseUrl: string;
    hash: string;
    images: string[];
};

export default function ChapterImagesContainerAndCounter({ mangaTitle, chapterNumber, baseUrl, hash, images }: ChapterImagesContainerAndCounterProps) {
    const [numberOfImagesLoaded, setNumberOfImagesLoaded] = useState<number>(0);

    useEffect(() => {
        if (images.length === numberOfImagesLoaded) {
            toast.success(
                <div className="flex items-center w-[356px] gap-x-2.5">
                    <CircleCheck size={18} fill="#16a34a" stroke="#ffffff" />
                    <span className="w-[calc(100%-18px-10px)] font-semibold text-white">Successfully loaded all pages</span>
                </div>,
                {
                    style: {
                        backgroundColor: '#16a34a',
                        border: '#16a34a',
                    },
                }
            );
        }
    }, [numberOfImagesLoaded]);

    return (
        <>
            {images.length === 0 ? (
                <div className="flex flex-col items-center w-full px-6 my-20">
                    <p className="text-red-600 font-medium">Chapter empty. No images to load.</p>
                </div>
            ) : (
                <div className="flex flex-col items-center w-full border-t-[1px]">
                    {images.map((image, index) => (
                        // <ChapterImage key={index} src={`${baseUrl}/data/${hash}/${image}`} index={index} setNumberOfImagesLoaded={setNumberOfImagesLoaded} />

                        <ChapterImageProxy
                            key={index}
                            mangaTitle={mangaTitle}
                            chapterNumber={chapterNumber}
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
