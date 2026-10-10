import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface CategoryArticle {
    id: string;
    imageUrl: string;
    imageAlt: string;
    title: string;
    description: string;
    url?: string;
}

const date = new Date().toLocaleDateString('bn-BD', {
    dateStyle: 'full',});
const categoryNews = async ({params}: { params: { categoryId: string }}) => {
    const { categoryId } = await params;
    const res = await fetch(`https://news-api-v2.vercel.app/api/category/${categoryId}`);
    const data = await res.json();
    const categoryNews: CategoryArticle[] = Array.isArray(data?.data) ? data.data : [];
    return ( 
        <main className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
            <h1 className="mb-5 text-center text-xl font-bold sm:mb-6 sm:text-2xl">{data.title}</h1>
            <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
                {categoryNews.map((news) => (
                    <Link key={news.id} href={`/news/${news.id}`} className="w-full min-w-0 max-w-md">
                        <div className="card w-full flex-row overflow-hidden bg-base-100 shadow-sm sm:flex-col">
                            <figure className="relative aspect-[4/3] w-[36%] shrink-0 overflow-hidden sm:aspect-video sm:w-full">
                                <Image src={news.imageUrl} alt={news.imageAlt || news.title} fill unoptimized className="object-cover" />
                            </figure>
                            <div className="card-body min-w-0 flex-1 gap-2 p-3 sm:p-5">
                                <h2 className="card-title line-clamp-2 break-words text-sm leading-snug sm:text-xl">{news.title}</h2>
                                <p className="line-clamp-3 break-words text-xs leading-relaxed sm:text-base">{news.description}</p>
                                <div className="card-actions min-w-0 justify-end">
                                    <span className="max-w-full truncate text-xs text-neutral-500">{news.url}</span>
                                </div>
                                <div>
                                    <p className="text-xs text-neutral-500 sm:text-sm">{date}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
};

export default categoryNews;