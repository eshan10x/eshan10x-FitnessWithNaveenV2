import { Fade } from "react-awesome-reveal";
import { Text } from "../atoms/Text";
import { GalleryTexts } from "../particles/Data";
import { useState } from "react";
import { Image } from "../atoms/Image";
import VideoModal from "../molecules/VideoModal";


enum GalleryItemType {
    IMAGE = "image",
    VIDEO = "video"
}

interface GalleryItem {
    id: string;
    type: GalleryItemType;
    src: string;
    title: string;
    category: string;
    thumbnail?: string;
}

const GalleryPage = () => {
    // State for active filter category
    const [activeCategory, setActiveCategory] = useState<string>("all");

    // State for modals
    const [selectedVideo, setSelectedVideo] = useState<GalleryItem | null>(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

    // Get unique categories from gallery items
    const categories = ["all", ...new Set(GalleryTexts.items.map(item => item.category))];

    // Filter gallery items based on active category
    const filteredItems = activeCategory === "all"
        ? GalleryTexts.items
        : GalleryTexts.items.filter(item => item.category === activeCategory);

    // Handle gallery item click
    const handleGalleryItemClick = (item: GalleryItem) => {
        if (item.type === 'video') {
            setSelectedVideo(item);
        } else {
            setSelectedImage(item);
            setLightboxOpen(true);
        }
    };

    // Function to render gallery item based on type
    const renderGalleryItem = (item: GalleryItem) => {
        return (
            <div
                key={item.id}
                className="group relative overflow-hidden rounded-lg bg-zinc-800 h-[300px] cursor-pointer"
                onClick={() => handleGalleryItemClick(item)}
            >
                {item.type === 'image' ? (
                    <Image
                        alt={item.title}
                        image={item.src}
                        objectCover="object-cover"
                        className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className="relative w-full h-full">
                        {/* Thumbnail with play button overlay */}
                        <Image
                            alt={`Thumbnail for ${item.title}`}
                            image={item.thumbnail || item.src}
                            objectCover="object-cover"
                            className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-primary bg-opacity-80 flex items-center justify-center">
                                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Overlay with title */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-end p-6">
                    <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <Text as="h3" className="text-zinc-100 font-bold text-xl mb-1">{item.title}</Text>
                        <Text as="p" className="text-primary text-sm">{item.category}</Text>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section className="w-full h-auto flex flex-col items-center bg-zinc-900 pt-24">
            {/* Hero Section */}
            <div className="w-full py-16 bg-zinc-950">
                <main className="lg:mx-20 md:mx-10 mx-6">
                    <Fade>
                        <div className="flex flex-col items-center text-center mb-10">
                            <div className="flex flex-col items-center relative before:absolute before:-bottom-6 before:left-0 before:right-0 before:mx-auto before:w-20 before:h-1 before:rounded-lg before:bg-primary before:from-amber-500 before:to-red-500 z-10">
                                <Text as="p" className="text-primary lg:text-sm text-xs tracking-widest uppercase font-medium">{GalleryTexts.firstText}</Text>
                                <Text as="h1" className="text-zinc-100 lg:text-5xl md:text-4xl text-3xl">{GalleryTexts.secondText}</Text>
                            </div>
                            <Text as="p" className="text-zinc-400 mt-16 mb-4 text-base max-w-3xl">{GalleryTexts.description}</Text>
                        </div>
                    </Fade>
                </main>
            </div>

            {/* Gallery Section */}
            <div className="w-full py-16 bg-zinc-900">
                <main className="lg:mx-20 md:mx-10 mx-6">
                    <Fade>
                        {/* Category filters */}
                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-6 py-2 rounded-full font-medium transition-colors duration-300 ${activeCategory === category
                                            ? "bg-primary text-white"
                                            : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                                        }`}
                                >
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </button>
                            ))}
                        </div>

                        {/* Gallery grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredItems.map(item => renderGalleryItem(item as GalleryItem))}
                        </div>

                        {/* Pagination (for future implementation) */}
                        {GalleryTexts.items.length > 12 && (
                            <div className="flex justify-center mt-12">
                                <div className="flex gap-2">
                                    <button className="w-10 h-10 rounded-md bg-zinc-800 text-zinc-300 flex items-center justify-center hover:bg-zinc-700 transition-colors duration-300">
                                        1
                                    </button>
                                    <button className="w-10 h-10 rounded-md bg-primary text-white flex items-center justify-center">
                                        2
                                    </button>
                                    <button className="w-10 h-10 rounded-md bg-zinc-800 text-zinc-300 flex items-center justify-center hover:bg-zinc-700 transition-colors duration-300">
                                        3
                                    </button>
                                </div>
                            </div>
                        )}
                    </Fade>
                </main>
            </div>

            {/* CTA Section */}
            <div className="w-full py-16 bg-zinc-950">
                <main className="lg:mx-20 md:mx-10 mx-6">
                    <Fade>
                        <div className="w-full bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border-l-4 border-primary">
                            <div className="flex flex-col gap-4 md:max-w-[60%]">
                                <Text as="h2" className="text-zinc-100 text-2xl md:text-3xl font-bold">
                                    Impressed by what you see?
                                </Text>
                                <Text as="p" className="text-zinc-400">
                                    Join our fitness family today and become part of our success stories. Experience our state-of-the-art facilities and expert guidance firsthand.
                                </Text>
                            </div>
                            <button className="bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-8 rounded-md hover:opacity-90 transition-all duration-300 whitespace-nowrap">
                                Join Now!
                            </button>
                        </div>
                    </Fade>
                </main>
            </div>

            {/* Video Modal */}
            {selectedVideo && (
                <VideoModal
                    isOpen={!!selectedVideo}
                    onClose={() => setSelectedVideo(null)}
                    videoSrc={selectedVideo.src}
                    title={selectedVideo.title}
                />
            )}

            {/* Image Lightbox */}
            {lightboxOpen && selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
                    <button
                        onClick={() => setLightboxOpen(false)}
                        className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-100 z-10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className="max-w-5xl max-h-[80vh]">
                        <Image
                            alt={selectedImage.title}
                            image={selectedImage.src}
                            objectCover="object-contain"
                            className="w-full h-full"
                        />
                        <div className="mt-4 text-center">
                            <Text as="h3" className="text-zinc-100 font-bold text-xl">{selectedImage.title}</Text>
                            <Text as="p" className="text-primary text-sm">{selectedImage.category}</Text>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default GalleryPage;