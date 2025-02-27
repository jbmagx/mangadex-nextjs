import type { Metadata } from 'next';

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.jbmagx.com'),
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
