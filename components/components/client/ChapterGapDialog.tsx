'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Dispatch, SetStateAction, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

type ChapterGapDialogProps = {
    openChapterGapDialog: boolean;
    setOpenChapterGapDialog: Dispatch<SetStateAction<boolean>>;
    prevChapterNumber: number | null;
    currentChapterNumber: number | null;
    nextChapterNumber: number | null;
    isPreviousButtonClicked: boolean;
    setIsPreviousButtonClicked: Dispatch<SetStateAction<boolean>>;
    isNextButtonClicked: boolean;
    setIsNextButtonClicked: Dispatch<SetStateAction<boolean>>;
    prevRoute: string;
    nextRoute: string;
};

export default function ChapterGapDialog({
    openChapterGapDialog,
    setOpenChapterGapDialog,
    prevChapterNumber,
    currentChapterNumber,
    nextChapterNumber,
    isPreviousButtonClicked,
    setIsPreviousButtonClicked,
    isNextButtonClicked,
    setIsNextButtonClicked,
    prevRoute,
    nextRoute,
}: ChapterGapDialogProps) {
    const router = useRouter();

    const [isContinueButtonClicked, setIsContinueButtonClicked] = useState<boolean>(false);

    return (
        <Dialog.Root open={openChapterGapDialog} onOpenChange={setOpenChapterGapDialog}>
            <Dialog.Trigger asChild />
            <Dialog.Portal>
                <Dialog.Overlay className="grid bg-black/50 fixed inset-0 overflow-y-auto place-items-center z-50 py-24">
                    <Dialog.Content
                        onInteractOutside={(event) => event.preventDefault()}
                        aria-describedby={undefined}
                        className="min-w-[20rem] w-[23rem] xs:w-[22.3775rem] xxs:w-[20rem] bg-background rounded-lg"
                    >
                        <Dialog.Title className="text-center font-semibold p-4 pb-2">Chapter Gap</Dialog.Title>

                        <div className="flex flex-col items-center w-full gap-y-2 px-6 mt-2 mb-6 xxs:mt-0 xxs:mb-4 [&>p]:text-sm [&>p]:text-center">
                            <p>There is a gap between the following chapters:</p>

                            {isPreviousButtonClicked && (
                                <p>
                                    {prevChapterNumber} &lt; {currentChapterNumber}
                                </p>
                            )}

                            {isNextButtonClicked && (
                                <p>
                                    {currentChapterNumber} &gt; {nextChapterNumber}
                                </p>
                            )}

                            <p>Do you wish to continue?</p>
                        </div>

                        <div className="flex flex-row items-center justify-end w-full gap-x-2.5 p-4 border-t">
                            <button
                                className="h-9 min-w-20 px-4 rounded-lg font-medium text-sm border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white duration-300 focus:outline-none"
                                onClick={() => {
                                    setOpenChapterGapDialog(!openChapterGapDialog);
                                    setIsPreviousButtonClicked(false);
                                    setIsNextButtonClicked(false);
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setIsContinueButtonClicked(true);
                                    router.push(isNextButtonClicked ? nextRoute : prevRoute, { scroll: false });
                                }}
                                className="flex items-center justify-center h-9 min-w-20 w-24 px-4 rounded-lg font-medium text-sm bg-orange-600 text-white hover:opacity-80 duration-300"
                            >
                                {isContinueButtonClicked ? <Loader2 size={16} className="animate-spin" /> : 'Continue'}
                            </button>
                        </div>
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
