'use client';

import { Drawer } from 'vaul';
import { Book, Menu as MenuIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import useChapters from '@/app/projects/mangadex/hooks/useChapters';
import ChapterNav from '@/app/projects/mangadex/manga/[id]/chapter/[chapterId]/components/chapter-nav/ChapterNav';

type MenuProps = {
    title?: string;
    currentChapter: string;
};

export default function Menu({ title, currentChapter }: MenuProps) {
    const { id } = useParams<{ id: string; chapterId: string }>();

    const { isFetching, chapters } = useChapters(id);

    return (
        <Drawer.Root autoFocus={true} direction="right">
            <Drawer.Trigger className="flex items-center justify-center gap-x-2 h-9 w-9 border rounded-md hover:bg-accent duration-300">
                <MenuIcon size={16} />
            </Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                <Drawer.Content className="flex top-0 bottom-0 right-0 fixed z-10 outline-none max-w-xs w-[80%]">
                    <div className="flex flex-col h-full w-full p-5 grow bg-background">
                        <div className="flex flex-col w-full">
                            <Drawer.Title className="flex items-center mb-2">
                                <Link href={`/projects/mangadex/manga/${id}`} scroll={false} className="flex items-center gap-x-2 text-orange-600">
                                    <Book size={18} />
                                    <span className="font-medium">{title}</span>
                                </Link>
                            </Drawer.Title>
                            <Drawer.Description />
                            {!isFetching && <ChapterNav id={id} currentChapter={currentChapter} chapters={chapters} />}
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
}
