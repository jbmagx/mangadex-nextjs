'use client';

import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

const ChapterScrollProgress = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;

            const scrollProgress = (scrollTop / (documentHeight - windowHeight)) * 100;
            setProgress(scrollProgress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full z-50">
            <Progress value={progress} className="h-1 bg-orange-500/20 [&>div]:bg-orange-500 rounded-none" />
        </div>
    );
};

export default ChapterScrollProgress;
