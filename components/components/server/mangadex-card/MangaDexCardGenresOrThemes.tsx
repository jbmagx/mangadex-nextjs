import { Badge } from '@/components/ui/badge';

type MangaDexCardGenresOrThemesProps = {
    tags: Tag[];
};

export default function MangaDexCardGenresOrThemes({ tags }: MangaDexCardGenresOrThemesProps) {
    return (
        <div className="flex flex-nowrap md:flex-wrap items-center w-full gap-0.5 mt-2 overflow-x-scroll no-scrollbar">
            {tags
                .filter((tag) => tag.attributes.group === 'genre' || tag.attributes.group === 'theme')
                .sort((a, b) => a.attributes.name.en.localeCompare(b.attributes.name.en))
                .map((tag, index) => (
                    <Badge variant="outline" className="bg-black text-white font-medium rounded-full text-nowrap" key={index}>
                        {tag.attributes.name.en}
                    </Badge>
                ))}
        </div>
    );
}
