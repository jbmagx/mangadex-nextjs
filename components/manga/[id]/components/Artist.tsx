import { Badge } from '@/components/ui/badge';

type ArtistProps = {
    relationships: Relationship[];
};

export default function Artist({ relationships }: ArtistProps) {
    return (
        <div className="flex flex-col w-full">
            <h2 className="font-semibold text-xs uppercase">Artist:</h2>
            <Badge variant="outline" className="w-fit bg-black text-white font-medium rounded-full text-nowrap">
                {relationships?.find((relationship) => relationship.type === 'artist')?.attributes?.name as string}
            </Badge>
        </div>
    );
}
