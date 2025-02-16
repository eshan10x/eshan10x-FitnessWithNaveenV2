import { FacebookLogo, InstagramLogo, TwitterLogo, YoutubeLogo } from "@phosphor-icons/react";

const StickyIcons = () => {
    return (
        <aside className="fixed lg:bottom-0 bottom-1/2 left-0  flex flex-col gap-5 items-center bg-primary z-40 rounded-e-lg py-3 px-2 ">
            <a href="/" className="text-zinc-900 hover:text-zinc-100">
                <FacebookLogo size={15} color="currentColor" weight="fill" />
            </a>
            <a href="/" className="text-zinc-900 hover:text-zinc-100">
                <TwitterLogo size={15} color="currentColor" weight="fill" />
            </a>
            <a href="/" className="text-zinc-900 hover:text-zinc-100">
                <YoutubeLogo size={15} color="currentColor" weight="fill" />
            </a>
            <a href="/" className="text-zinc-900 hover:text-zinc-100">
                <InstagramLogo size={15} color="currentColor" weight="fill" />
            </a>
        </aside>
    )
}

export default StickyIcons