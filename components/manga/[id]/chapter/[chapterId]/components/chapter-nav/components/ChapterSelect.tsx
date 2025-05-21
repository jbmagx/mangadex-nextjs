import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type ChapterSelectProps = {
    id: string;
    currentChapter: string;
    chapters: Chapter[];
};

export default function ChapterSelect({ id, currentChapter, chapters }: ChapterSelectProps) {
    const router = useRouter();

    const [selectValue, setSelectValue] = useState<string>(currentChapter);

    return (
        <Select
            aria-label="Select page"
            value={selectValue}
            onValueChange={(value) => {
                setSelectValue(value);
                const selectChapterId = chapters.find((chapter) => chapter.chapter === value)?.id;
                router.push(`/projects/mangadex/manga/${id}/chapter/${selectChapterId}`, { scroll: false });
            }}
        >
            <SelectTrigger id="select-page" className="focus:ring-0 gap-x-2 min-w-36 w-fit whitespace-nowrap grow">
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
    );
}
