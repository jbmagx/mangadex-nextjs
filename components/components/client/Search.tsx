'use client';

import { ChangeEvent, useId } from 'react';
import { Input } from '@/components/ui/input';
import { ArrowRight, LoaderCircleIcon, SearchIcon, X } from 'lucide-react';
import useSearch from '@/app/projects/mangadex/hooks/useSearch';

export default function SearchComponent() {
    const id = useId();
    const { searchKeywords, setSearchKeywords, handleSubmit, isSearching } = useSearch();

    return (
        <div className="flex w-full rounded-lg shadow-sm shadow-black/5">
            <form onSubmit={handleSubmit} className="w-full">
                <div className="relative">
                    <Input
                        id={id}
                        className="peer pe-9 ps-9 shadow-none text-sm border-2 h-10 rounded-lg focus-visible:border-zinc-600 focus-visible:ring-0 hover:border-zinc-400 transition-all duration-200"
                        placeholder="Search..."
                        type="search"
                        autoComplete="off"
                        value={searchKeywords}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchKeywords(e.target.value)}
                    />

                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                        {isSearching ? <LoaderCircleIcon className="animate-spin" size={17} role="status" aria-label="Loading..." /> : <SearchIcon size={17} aria-hidden="true" />}
                    </div>

                    {searchKeywords && (
                        <div className="absolute inset-y-0 end-11 flex flex-col items-center justify-center">
                            <button
                                className="flex items-center justify-center h-6 w-6 rounded-full text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground hover:bg-accent focus:z-10 focus-visible:outline focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                aria-label="Clear search input"
                                onClick={() => setSearchKeywords('')}
                                type="button"
                            >
                                <X size={16} strokeWidth={2} aria-hidden="true" />
                            </button>
                        </div>
                    )}

                    <button
                        className="pr-1 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Submit search"
                        type="submit"
                    >
                        <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                    </button>
                </div>
            </form>
        </div>
    );
}
