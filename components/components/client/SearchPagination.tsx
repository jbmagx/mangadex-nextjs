'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChangeEvent, useId, useState, useEffect } from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    query: string;
};

export default function SearchPagination({ currentPage, totalPages, query }: PaginationProps) {
    const id = useId();
    const router = useRouter();
    const searchParams = useSearchParams();

    const originalLanguages = searchParams.getAll('originalLanguage');

    const originalLanguageQuery = `${originalLanguages?.includes('ja') ? '&originalLanguage=ja' : ''}${originalLanguages?.includes('ko') ? '&originalLanguage=ko' : ''}${
        originalLanguages?.includes('zh') ? '&originalLanguage=zh' : ''
    }`;

    const maxPages = totalPages > 999 ? 999 : totalPages;

    const [page, setPage] = useState<string>(currentPage.toString());

    // 🔥 Sync the input value with the URL whenever 'currentPage' changes
    useEffect(() => {
        setPage(currentPage.toString());
    }, [currentPage]);

    return (
        <div className="flex flex-wrap w-full items-center justify-center md:justify-between gap-4">
            {/* Go to page input */}
            <div className="flex items-center gap-3">
                <Label htmlFor={id} className="whitespace-nowrap">
                    Go to page
                </Label>
                <Input
                    id={id}
                    type="text"
                    className="w-16 rounded-md text-center text-sm border-2 focus-visible:ring-0 focus-visible:border-zinc-600 duration-300"
                    value={page}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        const value = event.target.value;

                        // Only allow numbers
                        if (/^\d*$/.test(value)) {
                            const pageNumber = Number(value);

                            // Check if the number is within the valid range
                            if (pageNumber <= maxPages) {
                                setPage(value);
                            } else if (value === '') {
                                setPage('');
                            }
                        }
                    }}
                    onBlur={() => {
                        if (!page) setPage('1');
                        router.push(`/projects/mangadex${query ? `/search?q=${query}&` : '?'}page=${page ? page : '1'}${originalLanguageQuery}`, { scroll: false });
                        window.scrollTo(0, 0);
                    }}
                />
            </div>

            <div>
                {/* Pagination */}
                <Pagination>
                    <PaginationContent>
                        {/* First page button */}
                        <PaginationItem>
                            <PaginationLink
                                className="aria-disabled:pointer-events-none aria-disabled:opacity-50 border"
                                href={currentPage === 1 ? undefined : `/projects/mangadex${query ? `/search?q=${query}&` : '?'}page=1${originalLanguageQuery}`}
                                aria-label="Go to first page"
                                aria-disabled={currentPage === 1 ? true : undefined}
                                role={currentPage === 1 ? 'link' : undefined}
                            >
                                <ChevronFirst size={16} strokeWidth={2} aria-hidden="true" />
                            </PaginationLink>
                        </PaginationItem>

                        {/* Previous page button */}
                        <PaginationItem>
                            <PaginationLink
                                className="aria-disabled:pointer-events-none aria-disabled:opacity-50 border"
                                href={currentPage === 1 ? undefined : `/projects/mangadex${query ? `/search?q=${query}&` : '?'}page=${currentPage - 1}${originalLanguageQuery}`}
                                aria-label="Go to previous page"
                                aria-disabled={currentPage === 1 ? true : undefined}
                                role={currentPage === 1 ? 'link' : undefined}
                            >
                                <ChevronLeft size={16} strokeWidth={2} aria-hidden="true" />
                            </PaginationLink>
                        </PaginationItem>

                        {/* Page number information */}
                        <p className="flex-1 whitespace-nowrap text-sm text-muted-foreground mx-8" aria-live="polite">
                            Page <span className="text-foreground">{currentPage}</span> of <span className="text-foreground">{totalPages}</span>
                        </p>

                        {/* Next page button */}
                        <PaginationItem>
                            <PaginationLink
                                className="aria-disabled:pointer-events-none aria-disabled:opacity-50 border"
                                href={
                                    currentPage === totalPages
                                        ? undefined
                                        : `/projects/mangadex${query ? `/search?q=${query}&` : '?'}page=${currentPage + 1}${originalLanguageQuery}`
                                }
                                aria-label="Go to next page"
                                aria-disabled={currentPage === totalPages ? true : undefined}
                                role={currentPage === totalPages ? 'link' : undefined}
                            >
                                <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
                            </PaginationLink>
                        </PaginationItem>

                        {/* Last page button */}
                        <PaginationItem>
                            <PaginationLink
                                className="aria-disabled:pointer-events-none aria-disabled:opacity-50 border"
                                href={currentPage === totalPages ? undefined : `/projects/mangadex${query ? `/search?q=${query}&` : '?'}page=${totalPages}${originalLanguageQuery}`}
                                aria-label="Go to last page"
                                aria-disabled={currentPage === totalPages ? true : undefined}
                                role={currentPage === totalPages ? 'link' : undefined}
                            >
                                <ChevronLast size={16} strokeWidth={2} aria-hidden="true" />
                            </PaginationLink>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
