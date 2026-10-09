import Image from 'next/image';

interface Article {
    title?: string;
    author?: string;
    publishedAt?: string;
    image?: string;
    imageUrl?: string;
    thumbnail?: string;
    urlToImage?: string;
    text?: string;
}

const NewsDetails = async ({ params }: { params: { NewsId: string } }) => {
    const { NewsId } = await params;

    let news: Article | null = null;

    try {
        const res = await fetch(`https://news-api-v2.vercel.app/api/article/${NewsId}`);
        if (!res.ok) {
            throw new Error('Failed to fetch article');
        }

        const data: { data?: Article } & Article = await res.json();
        news = data?.data ?? data;
    } catch {
        return (
            <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 px-4 py-10 text-slate-100 sm:py-16">
                <div className="mx-auto max-w-2xl rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-center shadow-2xl backdrop-blur-sm sm:rounded-3xl sm:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-300 sm:text-sm">News unavailable</p>
                    <h1 className="mt-4 text-2xl font-bold text-white sm:text-3xl">We couldn&apos;t load this article.</h1>
                    <p className="mt-3 text-slate-300">Please try again in a moment.</p>
                </div>
            </main>
        );
    }

    const imageUrl = news?.image ?? news?.imageUrl ?? news?.thumbnail ?? news?.urlToImage;

    return (
        <main className="min-h-screen bg-white px-3 py-5 text-slate-800 sm:px-6 sm:py-10 lg:px-8">
            <article className="mx-auto w-full max-w-5xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)] ring-1 ring-slate-100 sm:rounded-[30px]">
                <div className="border-b border-slate-200 bg-white px-4 py-5 sm:px-8 sm:py-8 lg:px-10">
                    <span className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
                        Latest news
                    </span>

                    <h1 className="mt-4 break-words text-[clamp(1.5rem,5vw,3rem)] font-black leading-tight text-red-600 sm:mt-6">
                        {news?.title || 'Untitled article'}
                    </h1>

                    <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                        {news?.author && (
                            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                                By {news.author}
                            </span>
                        )}
                        {news?.publishedAt && (
                            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                                {new Date(news.publishedAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </span>
                        )}
                    </div>
                </div>

                <div className="p-4 sm:p-8 lg:p-10">
                    {imageUrl && (
                        <div className="mb-6 aspect-video overflow-hidden rounded-xl shadow-xl shadow-slate-200/80 sm:mb-8 sm:rounded-2xl">
                            <Image
                                src={imageUrl}
                                alt={news?.title || 'Article image'}
                                width={1200}
                                height={800}
                                unoptimized
                                className="h-full w-full object-cover"
                                priority
                            />
                        </div>
                    )}

                    <div className="space-y-4 break-words text-base leading-7 text-slate-700 sm:space-y-5 sm:text-lg sm:leading-8">
                        <p className="whitespace-pre-line">{news?.text || 'No article content available.'}</p>
                    </div>
                </div>
            </article>
        </main>
    );
};

export default NewsDetails;