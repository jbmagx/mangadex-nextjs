'use client';

import { useEffect, useState } from 'react';
import { ArrowRightIcon, X, ArrowUp, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ChapterNav from './ChapterNav';
import PopoverButton from './PopoverButton';
import { ModeToggle } from '@/components/mode-toggle';

type ChapterControls = {
    mangaId: string;
    currentChapter?: string;
    chapters: Chapter[];
};

export default function ChapterControls({ mangaId, currentChapter, chapters }: ChapterControls) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showMenuButtonNotification, setShowMenuButtonNotification] = useState<boolean>(true);
    useEffect(() => {
        const showMenuButtonNotificationLocalStorage = localStorage.getItem('showMenuButtonNotification');
        setShowMenuButtonNotification(showMenuButtonNotificationLocalStorage ? JSON.parse(showMenuButtonNotificationLocalStorage) : true);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (!isLoading) localStorage.setItem('showMenuButtonNotification', JSON.stringify(showMenuButtonNotification));
    }, [showMenuButtonNotification]);

    return (
        <div className="relative">
            <PopoverButton>
                <Link href={`/projects/mangadex/manga/${mangaId}`} scroll={false} className="flex items-center justify-center w-full mb-2.5 text-orange-600 font-semibold">
                    <ArrowLeft size={16} strokeWidth={2.25} />
                    <h2 className="text-xs text-center mx-2">RETURN TO TITLE PAGE</h2>
                </Link>

                <ChapterNav mangaId={mangaId} currentChapter={currentChapter} chapters={chapters} />

                <div className="flex items-center justify-between gap-x-2.5 mt-2.5 w-full">
                    <button onClick={() => window.scrollTo(0, 0)} className="flex items-center justify-center grow border gap-x-2 h-9 rounded-md hover:bg-accent">
                        <span className="text-sm">Scroll to top</span>
                        <ArrowUp size={16} strokeWidth={2} aria-hidden="true" />
                    </button>

                    <ModeToggle />
                </div>
            </PopoverButton>

            {/* To make the notification fixed, add classes like `fixed bottom-4 right-4` to the container element. */}
            {!isLoading && showMenuButtonNotification && (
                <div className="fixed bottom-3.5 right-16 bg-background z-50 max-w-[224px] rounded-lg px-3 py-2 shadow-lg border border-white bg-black text-white">
                    <div className="relative flex items-center gap-2">
                        <div className="flex items-end justify-between">
                            <p className="text-sm w-[calc(100%-16px)]">Use this menu button to select a chapter, go to the previous or next chapter, or scroll to the top.</p>

                            <div className="flex items-center justify-center h-5 w-5 -mr-0.5 bg-white text-black rounded-full transition-transform hover:translate-x-0.5">
                                <ArrowRightIcon className="transition-transform hover:translate-x-0.5" size={18} strokeWidth={3} aria-hidden="true" />
                            </div>
                        </div>

                        <Button
                            className="absolute -top-[1.15rem] -left-[1.5rem] p-0 h-6 w-6 border border-white bg-black text-white hover:bg-black/50 hover:text-white rounded-full"
                            aria-label="Close banner"
                            onClick={() => setShowMenuButtonNotification(!showMenuButtonNotification)}
                        >
                            <X size={16} className="" aria-hidden="true" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// const [open, setOpen] = useState<boolean>(false);
{
    /* <Popover>
        <PopoverTrigger
            className="group fixed bottom-4 right-4 flex items-center justify-center w-10 h-10 bg-orange-500 duration-300 text-white rounded-full z-50"
            onClick={() => setOpen((prevState) => !prevState)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
        >
            <svg
                className="pointer-events-none"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                />
                <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                />
                <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                />
            </svg>
        </PopoverTrigger>
        <PopoverContent align="end" sideOffset={12} className="w-fit rounded-xl" onInteractOutside={() => setOpen((prevState) => !prevState)}>
            <Link href={`/projects/mangadex/manga/${mangaId}`} scroll={false}>
                <h2 className="text-orange-600 font-medium text-sm text-center mb-2.5 -mt-1 line-clamp-2">{mangaTitle}</h2>
            </Link>

            <ChapterNav mangaId={mangaId} currentChapter={currentChapter} chapters={chapters} />

            <div className="flex flex-col mt-2.5">
                <button onClick={() => window.scrollTo(0, 0)} className="flex items-center justify-center border gap-x-2 h-9 rounded-md hover:bg-accent">
                    <span className="text-sm">Scroll to top</span>
                    <ArrowUp size={16} strokeWidth={2} aria-hidden="true" />
                </button>
            </div>
        </PopoverContent>
    </Popover> */
}
