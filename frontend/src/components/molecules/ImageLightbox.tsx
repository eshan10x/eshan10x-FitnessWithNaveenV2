import { useEffect } from "react";
import { Image } from "../atoms/Image";
import { Text } from "../atoms/Text";

interface ImageLightboxProps {
    isOpen: boolean;
    onClose: () => void;
    image: {
        src: string;
        title: string;
        category: string;
    };
}

const ImageLightbox = ({ isOpen, onClose, image }: ImageLightboxProps) => {
    // Handle keyboard events for navigation and closing
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            // Prevent scrolling
            document.body.style.overflow = 'hidden';
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            // Re-enable scrolling
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
            onClick={onClose}
        >
            <div 
                className="max-w-5xl max-h-[80vh]"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
            >
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-100 z-10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <Image
                    alt={image.title}
                    image={image.src}
                    objectCover="object-contain"
                    className="w-full h-full"
                />
                <div className="mt-4 text-center">
                    <Text as="h3" className="text-zinc-100 font-bold text-xl">{image.title}</Text>
                    <Text as="p" className="text-primary text-sm">{image.category}</Text>
                </div>
            </div>
        </div>
    );
};

export default ImageLightbox;