import Image from 'next/image';

export default function ProjectTitle() {
    return (
        <a href={'/projects/mangadex'} className="flex items-center justify-center gap-x-3">
            <span className="relative w-8 h-8">
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
            <span className="font-semibold text-xl text-center -tracking-[0.015625rem] mr-3">MangaDex</span>
        </a>
    );
}
