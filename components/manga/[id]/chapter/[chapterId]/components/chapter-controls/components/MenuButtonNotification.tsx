import { ArrowRightIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useLocalStorage from '@/hooks/useLocalStorage';

export default function MenuButtonNotification() {
    const [showMenuButtonNotification, setShowMenuButtonNotification] = useLocalStorage<boolean>('showMenuButtonNotification', true);

    return (
        // To make the notification fixed, add classes like `fixed bottom-4 right-4` to the container element.
        <div className="fixed bottom-3.5 right-16 z-50 max-w-56 rounded-lg px-3 py-2 shadow-lg border border-white bg-black text-white">
            <div className="relative flex items-center gap-2">
                <div className="flex items-end justify-between">
                    <p className="text-sm w-[calc(100%-1rem)]">Use this menu button to select a chapter, go to the previous or next chapter, or scroll to the top.</p>

                    <div className="flex items-center justify-center h-5 w-5 -mr-0.5 bg-white text-black rounded-full transition-transform hover:translate-x-0.5">
                        <ArrowRightIcon className="transition-transform hover:translate-x-0.5" size={18} strokeWidth={3} aria-hidden="true" />
                    </div>
                </div>

                <Button
                    className="absolute -top-[1.15rem] -left-6 p-0 h-6 w-6 border border-white bg-black text-white hover:bg-black/50 hover:text-white rounded-full"
                    aria-label="Close banner"
                    onClick={() => setShowMenuButtonNotification(!showMenuButtonNotification)}
                >
                    <X size={16} className="" aria-hidden="true" />
                </Button>
            </div>
        </div>
    );
}
