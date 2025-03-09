import { useEffect, useRef } from "react";
import { Text } from "../atoms/Text";

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoSrc: string;
    title: string;
}

const VideoModal = ({ isOpen, onClose, videoSrc, title }: VideoModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Close modal when clicking outside content
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            // Prevent body scrolling
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            // Re-enable body scrolling
            document.body.style.overflow = "auto";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
            <div ref={modalRef} className="bg-zinc-900 rounded-lg overflow-hidden max-w-4xl w-full">
                <div className="p-4 flex justify-between items-center border-b border-zinc-700">
                    <Text as="h3" className="text-zinc-100 font-bold">{title}</Text>
                    <button 
                        onClick={onClose} 
                        className="text-zinc-400 hover:text-zinc-100"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="aspect-video">
                    <video 
                        src={videoSrc} 
                        controls 
                        autoPlay 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default VideoModal;