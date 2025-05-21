import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, ChevronLeft } from 'lucide-react';

type PrevButtonProps = {
    id: string;
    index: number;
    prevChapterId: string;
    isPreviousButtonClicked: boolean;
    setIsPreviousButtonClicked: Dispatch<SetStateAction<boolean>>;
    currentChapterNumber: number | null;
    prevChapterNumber: number | null;
    openChapterGapDialog: boolean;
    setOpenChapterGapDialog: Dispatch<SetStateAction<boolean>>;
};

export default function PrevButton({
    id,
    index,
    prevChapterId,
    isPreviousButtonClicked,
    setIsPreviousButtonClicked,
    currentChapterNumber,
    prevChapterNumber,
    openChapterGapDialog,
    setOpenChapterGapDialog,
}: PrevButtonProps) {
    const router = useRouter();

    return (
        <button
            onClick={() => {
                setIsPreviousButtonClicked(true);

                if (!currentChapterNumber || (!prevChapterNumber && prevChapterNumber !== 0)) return;

                if (currentChapterNumber - prevChapterNumber > 1.99) {
                    setOpenChapterGapDialog(!openChapterGapDialog);
                } else {
                    router.push(`/projects/mangadex/manga/${id}/chapter/${prevChapterId}`, { scroll: false });
                }
            }}
            disabled={index === 0}
            className="flex items-center justify-center border h-9 w-9 rounded-md hover:bg-accent disabled:opacity-50 disabled:hover:bg-transparent disabled:text-muted-foreground"
        >
            {isPreviousButtonClicked ? <Loader2 size={16} className="animate-spin" /> : <ChevronLeft size={16} strokeWidth={2} aria-hidden="true" />}
        </button>
    );
}
