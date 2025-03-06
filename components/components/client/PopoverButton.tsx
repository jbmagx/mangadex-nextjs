'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { delay } from '@/lib/utils';

const PopoverButton = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement | null>(null);

    // Close popover when clicking outside
    useEffect(() => {
        const handleClickOutside = async (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                await delay(20); // A small delay so that the Select component (inside ChapterNav) onValueChange function can still execute before the popover closes.
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="fixed bottom-4 right-4 flex justify-center items-center">
            <motion.div
                initial={{ width: 'auto' }}
                animate={isOpen ? { width: 270, height: 142, padding: 16, x: 0, y: 0 } : { width: 'auto', height: 38, padding: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="bg-background shadow-lg border rounded-lg overflow-hidden"
                ref={popoverRef}
            >
                {!isOpen ? (
                    <motion.button onClick={() => setIsOpen(true)} whileTap={{ scale: 0.95 }} className="flex items-center justify-center w-9 h-9 rounded-md transition">
                        <Menu size={20} />
                    </motion.button>
                ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex flex-col items-center">
                        {children}
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default PopoverButton;
