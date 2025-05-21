import { Badge } from '@/components/ui/badge';

type FormatProps = {
    tags: Tag[];
};

export default function Format({ tags }: FormatProps) {
    return (
        tags.filter((tag) => tag.attributes.group === 'format').length > 0 && (
            <div className="flex flex-col w-full">
                <h2 className="font-semibold text-xs uppercase">Format</h2>
                <div className="flex flex-nowrap md:flex-wrap items-center w-full gap-0.5 no-scrollbar overflow-x-scroll">
                    {tags
                        .filter((tag) => tag.attributes.group === 'format')
                        .sort((a, b) => a.attributes.name.en.localeCompare(b.attributes.name.en))
                        .map((tag, index) => (
                            <Badge variant="outline" className="bg-black text-white font-medium rounded-full text-nowrap" key={index}>
                                {tag.attributes.name.en}
                            </Badge>
                        ))}
                </div>
            </div>
        )
    );
}
