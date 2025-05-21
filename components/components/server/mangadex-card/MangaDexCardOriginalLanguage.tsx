import { languages } from '@/app/projects/mangadex/constants/languages';

type MangaDexCardOriginalLanguageProps = {
    originalLanguage: string;
};

export default function MangaDexCardOriginalLanguage({ originalLanguage }: MangaDexCardOriginalLanguageProps) {
    return (
        languages.find((language) => language.code === originalLanguage) && (
            <span className="text-xl xs:text-2xl lg:text-3xl leading-[0] mr-0.5">{languages.find((language) => language.code === originalLanguage)?.flag}</span>
        )
    );
}
