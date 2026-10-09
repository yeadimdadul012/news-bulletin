import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NewsData {
  id: string;
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  imageAlt: string;
}

const MainNews = async () => {
  const res = await fetch('https://news-api-v2.vercel.app/api/news/sections', { cache: 'no-store' });
  const data = await res.json();
  const sections = Array.isArray(data?.data) ? data.data : [];
  const allArticles = sections.flatMap((section: { articles?: NewsData[] }) =>
    Array.isArray(section?.articles) ? section.articles : []
  );
  const firstNews = allArticles[0] ?? null;

  if (!firstNews) {
    return null;
  }
  const date = new Date().toLocaleDateString('bn-BD', {
    dateStyle: 'full',
  });

  return (
    <Link href={`/news/${firstNews.id}`} className="block min-w-0">
        <div className="w-full min-w-0 border border-neutral-300 bg-[#f5f5f5] p-3 shadow-[0_1px_0_rgba(0,0,0,0.04)] sm:p-4">
      <div className="space-y-3 bg-[#f5f5f5]">
        <div className="flex items-center justify-start">
          <span className="inline-flex items-center rounded bg-red-700 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">প্রধান খবর</span>
        </div>
     
        
        <div className="space-y-2 text-neutral-900">
          <h2 className="break-words text-[clamp(1.25rem,3vw,1.6rem)] font-black leading-[1.1] tracking-[-0.03em] text-neutral-900">{firstNews.title}</h2>
          <p className="break-words text-sm leading-6 text-neutral-700 sm:text-[0.9rem]">{firstNews.description}</p>
        </div>

        <div className="overflow-hidden rounded-sm border border-neutral-200 bg-neutral-100">
          <div className="aspect-video w-full overflow-hidden">
            <Image
              src={firstNews.imageUrl}
              alt={firstNews.imageAlt || firstNews.title}
              width={900}
              height={520}
              className="h-full w-full object-cover"
              loading="eager"
              unoptimized
            />
          </div>
        </div>
       


        <div className="break-words text-[0.65rem] font-medium text-neutral-500 sm:text-[0.68rem]">{date}</div>
      </div>
    </div>
    </Link>
  );
};

export default MainNews;
