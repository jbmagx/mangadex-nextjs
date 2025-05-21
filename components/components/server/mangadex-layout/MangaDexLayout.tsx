import Header from '@/components/header/Header';
import ProjectTitle from './components/ProjectTitle';
import Search from '@/app/projects/mangadex/components/client/Search';
import Footer from '@/components/footer/Footer';
import ProjectCredits from './components/ProjectCredits';
import ProjectTechStack from '@/components/ProjectTechStack';
import GitHubProjectRepositoryLink from '@/components/GitHubProjectRepositoryLink';
import ScrollToTop from '@/app/projects/mangadex/components/client/ScrollToTop';
import { techStack } from '@/app/projects/mangadex/constants/tech-stack';

export default function MangaDexLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/* Temporary fix for not scrolling to top when changing pages or routes. */}
            <ScrollToTop />
            {/* Temporary fix for not scrolling to top when changing pages or routes. */}

            <Header />

            <div className="flex flex-col w-full min-h-[100svh] sm:min-h-[100dvh] py-12 xs:py-14 sm:py-16 px-6">
                <div className="flex flex-col items-center w-full max-w-5xl mx-auto">
                    <ProjectTitle />

                    {/* Spacer */}
                    <div className="py-2.5" />

                    <Search />

                    {/* Spacer */}
                    <div className="py-3 md:py-4" />

                    {children}

                    {/* Spacer */}
                    <div className="py-3 xs:py-4 sm:py-5" />

                    <ProjectCredits />

                    {/* Spacer */}
                    <div className="py-3 xs:py-4 sm:py-5" />

                    <ProjectTechStack techStack={techStack} />

                    {/* Spacer */}
                    <div className="py-3 xs:py-4 sm:py-5" />

                    <GitHubProjectRepositoryLink link="https://github.com/jbmagx/mangadex-nextjs" />
                </div>
            </div>

            <Footer />
        </>
    );
}
