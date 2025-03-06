'use client';

import { useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function OriginalLanguageFilter() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Local state to hold selected languages instantly
    const [selectedOriginalLanguages, setSelectedOriginalLanguages] = useState<string[]>([]);

    // Local state to track loading checkboxes
    const [loadingState, setLoadingState] = useState<{ [key: string]: boolean }>({});

    // Sync selectedOriginalLanguages state with URL search params when they change
    useEffect(() => {
        setSelectedOriginalLanguages(searchParams.getAll('originalLanguage'));
    }, [searchParams]);

    const updateFilters = async (originalLanguage: string, checked: boolean) => {
        const params = new URLSearchParams(searchParams.toString());

        // Set loading state for this checkbox
        setLoadingState((prev) => ({ ...prev, [originalLanguage]: true }));

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

        // Simulate a short delay (for real-world async API fetching)
        await new Promise((resolve) => setTimeout(resolve, 500));

        router.push(`?${params.toString()}`, { scroll: false });

        // Remove loading state after navigation
        setLoadingState((prev) => ({ ...prev, [originalLanguage]: false }));
    };

    return (
        <div className="flex items-center gap-x-4 mb-6 overflow-x-scroll no-scrollbar">
            <h3 className="text-xs font-semibold uppercase">Filter</h3>

            {['ko', 'ja', 'zh'].map((language) => (
                <div key={language} className="flex items-center gap-2">
                    <Checkbox
                        id={language}
                        checked={selectedOriginalLanguages.includes(language)}
                        onCheckedChange={(checked) => updateFilters(language, checked as boolean)}
                        className="data-[state=checked]:bg-black data-[state=checked]:text-white border-black"
                    />

                    <label htmlFor={language} className="text-nowrap text-sm font-medium">
                        {language === 'ja' ? 'Manga (Japan)' : language === 'ko' ? 'Manhwa (Korea)' : 'Manhua (China)'}
                    </label>

                    {/* Show loader if checkbox is being updated */}
                    {loadingState[language] && <Loader2 className="animate-spin text-gray-500 w-4 h-4" />}
                </div>
            ))}
        </div>
    );
}
