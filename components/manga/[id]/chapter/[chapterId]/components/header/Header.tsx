import { ModeToggle } from '@/components/mode-toggle';
import Menu from './components/Menu';
import Logo from './components/Logo';

type HeaderProps = {
    title?: string;
    currentChapter: string;
};

export default function Header({ title, currentChapter }: HeaderProps) {
    return (
        <header className="flex flex-col justify-around items-center w-full px-6 h-16 shadow-[inset_0_-1px_0_0_#eaeaea] dark:shadow-[inset_0_-1px_0_0_#1A1A1A]">
            <nav className="flex items-center w-full max-w-5xl mx-auto justify-between">
                <Logo />

                <div className="flex items-center gap-x-4">
                    <ModeToggle />
                    <Menu title={title} currentChapter={currentChapter} />
                </div>
            </nav>
        </header>
    );
}
