import { Badge } from '@/components/ui/badge';

type AuthorProps = {
    relationships: Relationship[];
};

export default function Author({ relationships }: AuthorProps) {
    return (
        <div className="flex flex-col w-full">
            <h2 className="font-semibold text-xs uppercase">Author:</h2>
            <Badge variant="outline" className="w-fit bg-black text-white font-medium rounded-full text-nowrap">
                {relationships?.find((relationship) => relationship.type === 'author')?.attributes?.name as string}
            </Badge>
        </div>
    );
}
