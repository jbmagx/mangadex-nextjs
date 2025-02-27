'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { ArrowRight, Search, X } from 'lucide-react';
import { useId } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchComponent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const id = useId();

    const [searchKeywords, setSearchKeywords] = useState<string>('');

    useEffect(() => {
        const currentUrl = window.location.href;

        if (/\/projects\/mangadex\/search\?/.test(currentUrl)) {
            const query = searchParams.get('q');
            setSearchKeywords(query as string);
        }
    }, [searchParams]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        router.push(searchKeywords === '' ? '/projects/mangadex' : `/projects/mangadex/search?q=${searchKeywords}&page=1`, { scroll: false });
    };

    return (
        <div className="flex rounded-lg shadow-sm shadow-black/5">
            <form onSubmit={handleSubmit} className="w-full">
                <div className="relative">
                    <Input
                        id={id}
                        className="peer pe-9 ps-9 shadow-none text-sm border-2 h-10 rounded-lg focus-visible:border-zinc-600 focus-visible:ring-0"
                        placeholder="Search..."
                        type="search"
                        autoComplete="off"
                        value={searchKeywords}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchKeywords(e.target.value)}
                    />

                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                        <Search size={16} strokeWidth={2} />
                    </div>

                    {searchKeywords && (
                        <div className="absolute inset-y-0 end-11 flex flex-col items-center justify-center">
                            <button
                                className="flex items-center justify-center h-6 w-6 rounded-full text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground hover:bg-accent focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                aria-label="Clear search input"
                                onClick={() => setSearchKeywords('')}
                                type="button"
                            >
                                <X size={16} strokeWidth={2} aria-hidden="true" />
                            </button>
                        </div>
                    )}

                    <button
                        className="pr-1 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
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
