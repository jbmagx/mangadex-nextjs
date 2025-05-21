import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { baseURL } from '@/app/projects/mangadex/constants/base-url';
import { checkVolumeCompleteness } from '@/app/projects/mangadex/lib/checkVolumeCompleteness';
import Link from 'next/link';

type ChaptersProps = {
    id: string;
};

export default async function Chapters({ id }: ChaptersProps) {
    const mangaAggregateResponse = await fetch(`${baseURL}/api/projects/mangadex/manga/${id}/aggregate`);
    const mangaAggregate: MangaDexGetMangaIdAggregateResponse = await mangaAggregateResponse.json();

    return (
        <div className="flex flex-col w-full">
            <h2 className="font-semibold uppercase mb-4 text-sm">Chapters</h2>

            {Object.keys(mangaAggregate?.volumes).map((volumeKey) => {
                const volume = mangaAggregate?.volumes[volumeKey];
                const volumeFirstChapter = Object.keys(volume.chapters).sort((a, b) => parseFloat(a) - parseFloat(b))[0];
                const volumeLastChapter = Object.keys(volume.chapters).sort((a, b) => parseFloat(a) - parseFloat(b))[
                    Object.keys(volume.chapters).sort((a, b) => parseFloat(a) - parseFloat(b)).length - 1
                ];

                const chaptersList: string[] = [];
                Object.keys(volume.chapters)
                    .sort((a, b) => parseInt(a) - parseInt(b))
                    .map((chapter) => chaptersList.push(`Chapter ${chapter}`));

                const { isComplete, chapterCount, expectedChapterCount, missingChapters } = checkVolumeCompleteness(chaptersList);

                return (
                    <Accordion key={volumeKey} type="single" collapsible className="w-full space-y-2">
                        <AccordionItem value={volumeKey} className="rounded-lg border last:border-b-1 bg-background px-4 py-1 mb-2">
                            <AccordionTrigger className="justify-start gap-3 py-2 text-[0.9375rem] leading-6 hover:no-underline hover:text-orange-600 [&>svg]:-order-1 [&>svg]:hover:text-orange-600">
                                <div className="flex flex-wrap items-center justify-between w-full text-sm">
                                    <p className="flex items-center mr-4">
                                        {volume.volume === 'none' ? 'No Volume' : `Volume ${volume.volume}`}
                                        {!isComplete && <span className="ml-1">{'- [Incomplete]'}</span>}
                                    </p>
                                    <p className="text-nowrap">
                                        Chapter {volumeFirstChapter} - {volumeLastChapter}
                                    </p>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pb-2 ps-7 text-muted-foreground">
                                {missingChapters.length > 0 && (
                                    <div>
                                        <div className="flex flex-col w-full gap-y-2 my-2 [&>p]:text-black bg-accent p-2.5 rounded-lg">
                                            <p>
                                                {chapterCount} out of {expectedChapterCount} chapters
                                            </p>
                                            <p>
                                                {missingChapters.length} missing chapter{missingChapters.length === 1 ? '' : 's'}:
                                            </p>
                                            <div className="flex items-center w-full gap-2 overflow-x-scroll no-scrollbar mb-0.5">
                                                {missingChapters.map((chapter, index) => (
                                                    <Badge key={index} className="bg-black text-white text-nowrap hover:bg-black/80 select-none font-normal px-1.5">
                                                        {chapter}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <ul className="flex flex-col w-full mb-2">
                                    {Object.keys(volume.chapters)
                                        .sort((a, b) => parseFloat(a) - parseFloat(b))
                                        .map((chapterKey) => {
                                            const chapter = volume.chapters[chapterKey];

                                            return (
                                                <li key={chapterKey} className="flex items-center my-1.5">
                                                    <Link href={`/projects/mangadex/manga/${id}/chapter/${chapter.id}`} className="hover:text-orange-600">
                                                        Chapter {chapter.chapter}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                );
            })}
        </div>
    );
}
