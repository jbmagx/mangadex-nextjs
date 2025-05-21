import { useState, useCallback, useEffect } from 'react';
import { showOnErrorToast } from '@/app/projects/mangadex/lib/mangadexToasts';

export default function useChapterImageProxy(index: number, imageUrl: string) {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [reloadKey, setReloadKey] = useState(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState(false);

    const proxiedUrl = `/api/projects/mangadex/image?url=${encodeURIComponent(imageUrl)}&reload=${reloadKey}`;

    const handleRetry = useCallback(() => {
        setHasError(false);
        setIsLoading(true);
        setReloadKey((prev) => prev + 1); // Increments reloadKey to update proxiedUrl
    }, []);

    const handleError = useCallback(() => {
        setHasError(true);
        showOnErrorToast(`Failed to load page ${index + 1}`);
    }, []);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        const img = new window.Image();
        img.src = proxiedUrl;

        // If it loads successfully
        img.onload = () => {
            clearTimeout(timeoutId);
            setDimensions({ width: img.width, height: img.height });
            setIsLoading(false);
        };

        // If it errors naturally
        img.onerror = () => {
            clearTimeout(timeoutId);
            handleError();
        };

        // Timeout fallback
        timeoutId = setTimeout(() => {
            img.src = ''; // Cancel loading
            setIsLoading(false);
            setHasError(true);
            handleError();
        }, 60000); // 60 seconds timeout

        return () => {
            clearTimeout(timeoutId);
            img.onload = null;
            img.onerror = null;
        };
    }, [proxiedUrl, handleError]);

    return {
        proxiedUrl,
        isLoading,
        dimensions,
        reloadKey,
        hasError,
        handleError,
        handleRetry,
    };
}
