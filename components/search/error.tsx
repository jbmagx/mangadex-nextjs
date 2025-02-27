'use client'; // Error boundaries must be Client Components

import Link from 'next/link';
import { useEffect } from 'react';
import { CircleAlert } from 'lucide-react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center w-full h-[100dvh] xs:h-[100svh] xxs:h-[100svh]">
            <div className="w-full max-w-[320px] xxs:max-w-[280px]">
                <div className="flex flex-col items-center gap-y-3">
                    <CircleAlert size={100} />
                    <h1 className="w-full text-center font-bold text-3xl">Oops!</h1>
                </div>

                <p className="w-full text-center font-medium text-base py-2 px-5">It seems like there's a problem with the search params.</p>

                <div className="flex items-center justify-center gap-2 p-5 pt-2">
                    <Link
                        scroll={false}
                        href="/projects/mangadex"
                        className="flex items-center justify-center bg-green-500 text-black h-10 min-w-20 w-36 px-4 rounded-full text-sm font-medium text-nowrap hover:bg-green-500/80 duration-300"
                    >
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
