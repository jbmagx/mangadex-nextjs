'use client';

import { ModeToggle } from '@/components/mode-toggle';
import Image from 'next/image';
import ChapterDrawer from './ChapterDrawer';

type ChapterHeaderProps = {
    mangaTitle: string;
    mangaId: string;
    chapterNumber?: string;
    chapters: Chapter[];
};

export default function ChapterHeader({ mangaTitle, mangaId, chapterNumber, chapters }: ChapterHeaderProps) {
    return (
        <header className="flex flex-col justify-around items-center w-full px-6 h-16 shadow-[inset_0_-1px_0_0_#eaeaea] dark:shadow-[inset_0_-1px_0_0_#1A1A1A]">
            <nav className="flex items-center w-full max-w-5xl mx-auto justify-between">
                <a href={'/projects/mangadex'} className="flex xs:flex-wrap xxs:flex-wrap items-center justify-center gap-x-2">
                    <span className="relative w-7 h-7">
                        <Image
                            src={'/images/svg/mangadex.svg'}
                            alt="MangaDex logo"
                            fill={true}
                            priority={true}
                            sizes="33vw"
                            style={{
                                objectFit: 'contain',
                            }}
                        />
                    </span>
                    <h1 className="font-semibold text-lg tracking-tighter select-none">MangaDex</h1>
                </a>

                <div className="flex items-center gap-x-4">
                    <ModeToggle />

                    <ChapterDrawer mangaTitle={mangaTitle} mangaId={mangaId} chapterNumber={chapterNumber} chapters={chapters} />
                </div>
            </nav>
        </header>
    );
}
