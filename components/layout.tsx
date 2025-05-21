import type { Metadata } from 'next';
import { baseURL } from './constants/base-url';

export const metadata: Metadata = {
    metadataBase: new URL(baseURL),
    title: 'jbmagx | MangaDex',
    icons: {
        icon: '/images/svg/jbmagx-icon.svg',
    },
    description: 'jbmagx MangaDex — Read ad-free high quality images manga, manhwa, and manhua from mangadex.org.',
    openGraph: {
        images: ['/images/svg/mangadex.svg'],
    },
};

export default function MangaDexLayout({ children }: { children: React.ReactNode }) {
    return <main className="flex flex-col w-full">{children}</main>;
}
