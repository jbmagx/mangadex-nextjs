import Image from 'next/image';

export default function Logo() {
    return (
        <a href={'/projects/mangadex'} className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-x-2">
            <span className="relative w-7 h-7">
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
            <h1 className="font-semibold text-lg tracking-tighter select-none">MangaDex</h1>
        </a>
    );
}
