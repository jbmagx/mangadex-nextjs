import { Loader2 } from 'lucide-react';
import { WebsiteLogo } from 'public/images/svg-tsx/jbmagx-logo';

export default function ChapterLoading({ message }: { message: string }) {
    return (
        <div className="flex flex-col items-center my-10">
            <div className="relative flex items-center justify-center w-full">
                <Loader2 width={120} height={120} strokeWidth="0.75" className="animate-loading-spin" />

                <div className="absolute self-center text-black dark:[&>svg]:text-white">
                    <WebsiteLogo width={36} height={36} />
                </div>
            </div>
            <p className="text-sm font-medium text-orange-600">{message}</p>
        </div>
    );
}
