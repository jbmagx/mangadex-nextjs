import { toast } from 'sonner';
import { ToastContent } from '@/components/ToastContent';
import { CircleAlert, CircleCheck } from 'lucide-react';

export function showSuccessfullyLoadedAllImagesToast() {
    toast(<ToastContent icon={<CircleCheck size={18} fill="#16a34a" stroke="#ffffff" />} message="Successfully loaded all pages" />, {
        style: {
            backgroundColor: '#16a34a',
            border: 'none',
            padding: '1rem',
            borderRadius: '8px',
        },
        position: 'top-center',
    });
}

export function showOnErrorToast(message: string) {
    toast(<ToastContent icon={<CircleAlert size={18} fill="#dc2626" stroke="#ffffff" />} message={message} />, {
        style: {
            backgroundColor: '#dc2626',
            border: 'none',
            padding: '1rem',
            borderRadius: '8px',
        },
        position: 'top-center',
    });
}
