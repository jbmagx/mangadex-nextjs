import { Loader2 } from 'lucide-react';
import { WebsiteLogo } from 'public/images/svg-tsx/jbmagx-logo';

export default function Loading() {
    return (
        <div className="relative flex items-center justify-center w-full h-[100dvh] xs:h-[100svh] xxs:h-[100svh]">
            <Loader2 width={160} height={160} strokeWidth="0.625" className="animate-loading-spin" />

            <div className="absolute self-center text-black dark:[&>svg]:text-white">
                <WebsiteLogo width={48} height={48} />
            </div>
        </div>
    );
}
