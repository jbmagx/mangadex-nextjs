'use client';

import { useEffect, useState, useTransition } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function OriginalLanguageFilter() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Local state to hold selected languages instantly
    const [selectedOriginalLanguages, setSelectedOriginalLanguages] = useState<string[]>([]);

    // Detect if router is navigating
    const [isPending, startTransition] = useTransition();

    // Sync selectedOriginalLanguages state with URL search params when they change
    useEffect(() => {
        setSelectedOriginalLanguages(searchParams.getAll('originalLanguage'));
    }, [searchParams]);

    const updateFilters = async (originalLanguage: string, checked: boolean) => {
        const params = new URLSearchParams(searchParams.toString());

        if (checked) {
            params.append('originalLanguage', originalLanguage);
            setSelectedOriginalLanguages((prev) => [...prev, originalLanguage]); // Optimistic update
        } else {
            const newValues = selectedOriginalLanguages.filter((origLang) => origLang !== originalLanguage);
            params.delete('originalLanguage');
            newValues.forEach((origLang) => params.append('originalLanguage', origLang));
            setSelectedOriginalLanguages(newValues); // Optimistic update
        }

        // Reset page to 1 when filters change
        params.set('page', '1');

        // Start transition (non-blocking UI update)
        startTransition(() => {
            router.push(`?${params.toString()}`, { scroll: false });
        });
    };

    return (
        <div className="flex flex-col w-full gap-y-2.5">
            <div className="flex items-center gap-x-4 overflow-x-scroll no-scrollbar">
                <h3 className="font-semibold text-xs uppercase">Filter</h3>

                {['ko', 'ja', 'zh'].map((language) => (
                    <div key={language} className="flex items-center gap-2">
                        <Checkbox
                            id={language}
                            checked={selectedOriginalLanguages.includes(language)}
                            onCheckedChange={(checked) => updateFilters(language, checked as boolean)}
                            className="data-[state=checked]:bg-black data-[state=checked]:text-white border-black"
                            disabled={isPending} // Disable while filtering is in progress
                        />

                        <label htmlFor={language} className="font-medium text-sm text-nowrap">
                            {language === 'ja' ? 'Manga (Japan)' : language === 'ko' ? 'Manhwa (Korea)' : 'Manhua (China)'}
                        </label>
                    </div>
                ))}
            </div>

            {/* Global loading indicator */}
            {isPending && (
                <div className="flex items-center gap-2 font-medium text-sm text-orange-600">
                    <Loader2 className="animate-spin w-4 h-4" />
                    Applying filters...
                </div>
            )}
        </div>
    );
}
