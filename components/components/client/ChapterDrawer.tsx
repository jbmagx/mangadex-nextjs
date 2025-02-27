'use client';

import { Drawer } from 'vaul';
import { Book, Menu } from 'lucide-react';
import Link from 'next/link';
import ChapterNav from './ChapterNav';

type ChapterDrawerProps = {
    mangaTitle: string;
    mangaId: string;
    chapterNumber?: string;
    chapters: Chapter[];
};

export default function ChapterDrawer({ mangaTitle, mangaId, chapterNumber, chapters }: ChapterDrawerProps) {
    return (
        <Drawer.Root autoFocus={true} direction="right">
            <Drawer.Trigger className="flex items-center justify-center gap-x-2 h-9 w-9 border rounded-md hover:bg-accent duration-300">
                <Menu size={16} />
            </Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                <Drawer.Content className="flex top-0 bottom-0 right-0 fixed z-10 outline-none max-w-xs w-[80%]">
                    <div className="flex flex-col h-full w-full p-5 grow bg-background">
                        <div className="flex flex-col w-full">
                            <Drawer.Title className="flex items-center mb-2">
                                <Link href={`/projects/mangadex/manga/${mangaId}`} scroll={false} className="flex items-center gap-x-2 text-orange-600">
                                    <Book size={18} />
                                    <span className="font-medium">{mangaTitle}</span>
                                </Link>
                            </Drawer.Title>
                            <Drawer.Description />
                            <ChapterNav mangaId={mangaId} currentChapter={chapterNumber} chapters={chapters} />
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
}
