import Link from 'next/link';
import Image from 'next/image';

export default function ProjectCredits() {
    return (
        <div className="flex flex-col w-full items-center justify-center">
            <div className="flex flex-col max-w-68 xs:max-w-81 sm:max-w-102 p-5 border-2 border-dotted gap-y-2.5">
                <h2 className="font-semibold text-sm uppercase">Credits:</h2>

                <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-y-3 xs:gap-y-3 sm:gap-x-4">
                    <Link href="https://mangadex.org/" target="_blank" className="relative w-16 aspect-square">
                        <Image src="/images/svg/mangadex.svg" alt="TMDB logo" fill={true} sizes="33vw" style={{ objectFit: 'contain' }} />
                    </Link>

                    <div className="w-full sm:w-[calc(100%-4rem-1rem)]">
                        <p className="text-sm">
                            All manga, manhwa, and manhua data are provided by{' '}
                            <Link href="https://mangadex.org/" target="_blank" className="text-orange-600">
                                MangaDex
                            </Link>
                            . This project is not affiliated with or endorsed by{' '}
                            <Link href="https://mangadex.org/" target="_blank" className="text-orange-600">
                                MangaDex
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
