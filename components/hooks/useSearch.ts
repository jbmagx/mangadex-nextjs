import { FormEvent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function useSearch() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchKeywords, setSearchKeywords] = useState<string>('');
    const [isSearching, setIsSearching] = useState<boolean>(false);

    useEffect(() => {
        const query = searchParams.get('q');
        setSearchKeywords(query ?? '');
        setIsSearching(false);
    }, [searchParams]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSearching(true);

        router.push(searchKeywords === '' ? '/projects/mangadex' : `/projects/mangadex/search?q=${searchKeywords}&page=1`, { scroll: false });
    };

    return {
        searchKeywords,
        setSearchKeywords,
        handleSubmit,
        isSearching,
    };
}
