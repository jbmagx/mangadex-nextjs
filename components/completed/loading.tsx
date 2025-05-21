import { Loader2 } from 'lucide-react';
import { WebsiteLogo } from 'public/images/svg-tsx/jbmagx-logo';

export default function Loading() {
    return (
        <div className="relative flex items-center justify-center w-full h-[100svh] sm:h-[100dvh]">
            <Loader2 size={160} strokeWidth="0.75" className="animate-loading-spin" />

            <div className="absolute self-center text-black dark:[&>svg]:text-white">
                <WebsiteLogo width={48} height={48} />
            </div>
        </div>
    );
}
