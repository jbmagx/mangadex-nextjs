'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ChapterGapDialog from './ChapterGapDialog';

type ChapterNavProps = {
    mangaId: string;
    currentChapter?: string;
    chapters: Chapter[];
};

export default function ChapterNav({ mangaId, currentChapter, chapters }: ChapterNavProps) {
    const router = useRouter();

    const index = chapters.findIndex((chapter) => chapter.chapter === currentChapter);

    const prevChapterId = chapters[index - 1]?.id;
    const nextChapterId = chapters[index + 1]?.id;
    const prevChapterNumber = chapters[index - 1]?.chapter ? parseFloat(chapters[index - 1]?.chapter) : null;
    const currentChapterNumber = chapters[index]?.chapter ? parseFloat(chapters[index]?.chapter) : null;
    const nextChapterNumber = chapters[index + 1]?.chapter ? parseFloat(chapters[index + 1]?.chapter) : null;

    const [isPreviousButtonClicked, setIsPreviousButtonClicked] = useState<boolean>(false);
    const [isNextButtonClicked, setIsNextButtonClicked] = useState<boolean>(false);

    const [selectValue, setSelectValue] = useState<string | undefined>(currentChapter);

    const [openChapterGapDialog, setOpenChapterGapDialog] = useState<boolean>(false);

    return (
        <>
            <ChapterGapDialog
                openChapterGapDialog={openChapterGapDialog}
                setOpenChapterGapDialog={setOpenChapterGapDialog}
                prevChapterNumber={prevChapterNumber}
                currentChapterNumber={currentChapterNumber}
                nextChapterNumber={nextChapterNumber}
                isPreviousButtonClicked={isPreviousButtonClicked}
                setIsPreviousButtonClicked={setIsPreviousButtonClicked}
                isNextButtonClicked={isNextButtonClicked}
                setIsNextButtonClicked={setIsNextButtonClicked}
                prevRoute={`/projects/mangadex/manga/${mangaId}/chapter/${prevChapterId}`}
                nextRoute={`/projects/mangadex/manga/${mangaId}/chapter/${nextChapterId}`}
            />

            <div className="flex items-center justify-between w-full gap-x-2.5">
                <button
                    onClick={() => {
                        setIsPreviousButtonClicked(true);

                        if (!currentChapterNumber || !prevChapterNumber) return;

                        if (currentChapterNumber - prevChapterNumber > 1.99) {
                            setOpenChapterGapDialog(!openChapterGapDialog);
                        } else {
                            router.push(`/projects/mangadex/manga/${mangaId}/chapter/${prevChapterId}`, { scroll: false });
                        }
                    }}
                    disabled={index === 0}
                    className="flex items-center justify-center border h-9 w-9 rounded-md hover:bg-accent"
                >
                    {isPreviousButtonClicked ? <Loader2 size={16} className="animate-spin" /> : <ChevronLeft size={16} strokeWidth={2} aria-hidden="true" />}
                </button>

                <Select
                    aria-label="Select page"
                    value={selectValue}
                    onValueChange={(value) => {
                        setSelectValue(value);
                        const selectChapterId = chapters.find((chapter) => chapter.chapter === value)?.id;
                        router.push(`/projects/mangadex/manga/${mangaId}/chapter/${selectChapterId}`, { scroll: false });
                    }}
                >
                    <SelectTrigger autoFocus={true} id="select-page" className="focus:ring-0 gap-x-2 min-w-36 w-fit whitespace-nowrap grow">
                        <SelectValue placeholder="Select page" />
                    </SelectTrigger>
                    <SelectContent>
                        {chapters.map((chapter) => (
                            <SelectItem key={chapter.id} value={chapter.chapter}>
                                Chapter {chapter.chapter}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <button
                    onClick={() => {
                        setIsNextButtonClicked(true);

                        if (!nextChapterNumber || !currentChapterNumber) return;

                        if (nextChapterNumber - currentChapterNumber > 1.99) {
                            setOpenChapterGapDialog(!openChapterGapDialog);
                        } else {
                            router.push(`/projects/mangadex/manga/${mangaId}/chapter/${nextChapterId}`, { scroll: false });
                        }
                    }}
                    disabled={index === chapters.length - 1}
                    className="flex items-center justify-center border h-9 w-9 rounded-md hover:bg-accent"
                >
                    {isNextButtonClicked ? <Loader2 size={16} className="animate-spin" /> : <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />}
                </button>
            </div>
        </>
    );
}
