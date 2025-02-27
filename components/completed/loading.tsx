import { Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function Loading() {
    return (
        <div className="relative flex items-center justify-center w-full h-[100dvh] xs:h-[100svh] xxs:h-[100svh]">
            <Loader2 width={160} height={160} strokeWidth="0.625" className="animate-loading-spin" />

            <div className="absolute self-center dark:invert">
                <Image src="/images/svg/jbmagx.svg" alt="jbmagx logo" width={48} height={48} />
            </div>
        </div>
    );
}
