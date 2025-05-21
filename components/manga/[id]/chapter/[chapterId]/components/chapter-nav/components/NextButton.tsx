import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, ChevronRight } from 'lucide-react';

type NextButtonProps = {
    id: string;
    index: number;
    nextChapterId: string;
    isNextButtonClicked: boolean;
    setIsNextButtonClicked: Dispatch<SetStateAction<boolean>>;
    currentChapterNumber: number | null;
    nextChapterNumber: number | null;
    openChapterGapDialog: boolean;
    setOpenChapterGapDialog: Dispatch<SetStateAction<boolean>>;
    numberOfChapters: number;
};

export default function NextButton({
    id,
    index,
    nextChapterId,
    isNextButtonClicked,
    setIsNextButtonClicked,
    currentChapterNumber,
    nextChapterNumber,
    openChapterGapDialog,
    setOpenChapterGapDialog,
    numberOfChapters,
}: NextButtonProps) {
    const router = useRouter();

    return (
        <button
            onClick={() => {
                setIsNextButtonClicked(true);

                if (!nextChapterNumber || (!currentChapterNumber && currentChapterNumber !== 0)) return;

                if (nextChapterNumber - currentChapterNumber > 1.99) {
                    setOpenChapterGapDialog(!openChapterGapDialog);
                } else {
                    router.push(`/projects/mangadex/manga/${id}/chapter/${nextChapterId}`, { scroll: false });
                }
            }}
            disabled={index === numberOfChapters - 1}
            className="flex items-center justify-center border h-9 w-9 rounded-md hover:bg-accent disabled:opacity-50 disabled:hover:bg-transparent disabled:text-muted-foreground"
        >
            {isNextButtonClicked ? <Loader2 size={16} className="animate-spin" /> : <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />}
        </button>
    );
}
