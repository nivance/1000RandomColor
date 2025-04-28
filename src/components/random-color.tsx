import { useLocale } from 'next-intl';

export default function RandomColor() {
    const locale = useLocale();
    
    return (
        <section className="mb-12">
            <h1 className="text-2xl font-bold text-white text-center mb-4">1000 Random Word</h1>
            <div className="mx-auto w-[80%]">
                <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4" style={{ rowGap: '2px' }}>
                    {words.map((word, index) => (
                        <div key={index} className="p-1 rounded">
                            <p className="front-mono text-sm">{word}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}