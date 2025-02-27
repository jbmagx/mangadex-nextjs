import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/header/Header';
import Search from '../client/Search';
import Footer from '@/components/footer/Footer';
import ScrollToTop from '../client/ScrollToTop';

export default function MangaDexLayout({ children }: { children: React.ReactNode }) {
    const techStack = [
        { name: 'Next.js', link: 'https://nextjs.org/', color: 'bg-black text-white' },
        { name: 'React', link: 'https://react.dev/', color: 'bg-primary text-white' },
        { name: 'MangaDex API', link: 'https://api.mangadex.org/docs/', color: 'bg-orange-600 text-white' },
        { name: 'ShadcnUI', link: 'https://ui.shadcn.com/', color: 'bg-black text-white' },
        { name: 'Tailwind CSS', link: 'https://tailwindcss.com/', color: 'bg-green-600 text-white' },
    ];

    return (
        <>
            {/* Temporary fix for not scrolling to top when changing pages or routes. */}
            <ScrollToTop />
            {/* Temporary fix for not scrolling to top when changing pages or routes. */}

            <Header />

            <div className="flex flex-col w-full min-h-[100dvh] xs:min-h-[100svh] xxs:min-h-[100svh] px-6">
                <div className="flex flex-col w-full max-w-5xl mx-auto py-16">
                    <div className="flex items-center justify-center mb-8">
                        <a href={'/projects/mangadex'} className="flex items-center justify-center gap-x-3">
                            <span className="relative w-8 h-8">
                                <Image
                                    src={'/images/svg/mangadex.svg'}
                                    alt="MangaDex logo"
                                    fill={true}
                                    priority={true}
                                    sizes="33vw"
                                    style={{
                                        objectFit: 'contain',
                                    }}
                                />
                            </span>
                            <span className="font-semibold text-xl text-center tracking-[-0.25px] mr-3">MangaDex</span>
                        </a>
                    </div>

                    <div className="mb-8">
                        <Search />
                    </div>

                    {children}

                    <div className="my-10" />

                    <div className="flex flex-col w-full items-center justify-center">
                        <div className="flex flex-col max-w-[25.5rem] xs:max-w-[20.25rem] xxs:max-w-[17rem] p-5 border-2 border-dotted gap-y-2.5">
                            <h2 className="text-sm font-semibold uppercase">Credits:</h2>

                            <div className="flex xs:flex-wrap xxs:flex-wrap items-center justify-center gap-x-4 xs:gap-y-3 xxs:gap-y-3">
                                <Link href="https://mangadex.org/" target="_blank" className="relative w-16 aspect-square">
                                    <Image src="/images/svg/mangadex.svg" alt="TMDB logo" fill={true} sizes="33vw" style={{ objectFit: 'contain' }} />
                                </Link>

                                <div className="w-[calc(100%-4rem-1rem)] xs:w-full xxs:w-full">
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

                    <div className="flex flex-wrap align-center justify-center gap-2 xs:max-w-[276px] my-10 mx-auto">
                        <div className="self-center font-semibold uppercase text-sm tracking-tight">Tech Stack:</div>
                        <div className="flex flex-wrap align-center justify-center gap-2">
                            {techStack.map((tech, index) => (
                                <Link
                                    key={index}
                                    href={tech.link}
                                    target="_blank"
                                    className={`${tech.color} flex items-center justify-center font-semibold text-xs rounded-sm px-1.5`}
                                >
                                    {tech.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center">
                        <Link
                            href="https://github.com/jbmagx/mangadex-nextjs"
                            target="_blank"
                            className="flex items-center justify-center gap-x-2 px-8 h-12 rounded-full bg-[#0A7EA4]"
                        >
                            <span className="text-white text-sm font-semibold uppercase">Project Repository</span>
                            <Image src="/images/svg/github.svg" alt="GitHub logo" width={32} height={32} className="invert" />
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
