import React from 'react';

const MostReadNews = async () => {
  const res = await fetch('https://news-api-v2.vercel.app/api/news/most-read');
  const data = await res.json();
  const mostReadNews = (data.data ?? []).slice(0, 6);
  

  return (
    <aside className="overflow-hidden rounded-none border border-neutral-200 bg-white shadow-sm">
      <h3 className="bg-[#d92222] px-3 py-2 text-xl font-bold text-white">সার্বিক পঠিত</h3>
      <ol className="divide-y divide-neutral-200 bg-[#f5f5f5]">
        {mostReadNews.map((mrn: { id: string | number; title: string }, index: number) => (
          <li key={mrn.id} className="flex min-w-0 items-start gap-2 px-3 py-3">
            <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded bg-red-700 text-sm font-bold text-white">
              {index + 1}
            </span>
            <p className="min-w-0 break-words text-sm leading-relaxed text-neutral-900 sm:text-base">{mrn.title}</p>
          </li>
        ))}
      </ol>
    </aside>
  );
};

export default MostReadNews;