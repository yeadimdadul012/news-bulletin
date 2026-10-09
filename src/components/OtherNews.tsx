import Image from 'next/image';
import Link from 'next/link';

interface OtherNewsData {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
    firstPublished?: string;
}

const OtherNews = async () => {
    const res = await fetch("https://news-api-v2.vercel.app/api/news/sections");
    const data = await res.json();
    const sections = data.data;
    const otherNews: OtherNewsData[] = sections[0].articles.slice(1);

    return (
        <div>
            <p className="border-b-2 pb-2 border-red-700 font-bold">নির্বাচিত খবর</p>
            <div className="grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                {otherNews.map((news) => (
                    <div className="min-h-[220px] sm:min-h-[236px]" key={news.id}>
                        <Link href={`/news/${news.id}`} className="block h-full">
                            <div className="card h-full w-full overflow-hidden rounded-md border border-neutral-200 bg-white shadow-none">
                                <figure className="relative aspect-video w-full shrink-0 bg-neutral-100">
                                    <Image
                                        src={news.imageUrl}
                                        alt={news.imageAlt || news.title}
                                        width={800}
                                        height={450}
                                        className="h-full w-full object-cover"
                                        unoptimized
                                    />
                                </figure>
                                <div className="card-body min-h-0 flex-1 gap-1 overflow-hidden p-2">
                                    <p className="text-[10px] leading-none text-red-700">নির্বাচিত খবর</p>
                                    <h2 className="card-title line-clamp-2 text-sm leading-snug text-neutral-900">{news.title}</h2>
                                    <p className="line-clamp-2 text-xs leading-relaxed text-neutral-600">{news.description}</p>
                                    {news.firstPublished && (() => {
                                        const publishDate = new Date(news.firstPublished!);

                                        if (Number.isNaN(publishDate.getTime())) {
                                            return null;
                                        }

                                        return (
                                            <p className="mt-auto text-[10px] text-neutral-500">
                                                {publishDate.toLocaleDateString('bn-BD', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </p>
                                        );
                                    })()}
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OtherNews;
