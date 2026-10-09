import React from 'react';

interface NewsData {
  id: string;
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  imageAlt: string;
}

const QuestionList = async () => {
  const res = await fetch('https://news-api-v2.vercel.app/api/news/sections', { cache: 'no-store' });
  const data = await res.json();
  const sections = Array.isArray(data?.data) ? data.data : [];
  const allArticles: NewsData[] = sections.flatMap((section: { articles?: NewsData[] }) =>
    Array.isArray(section?.articles) ? section.articles : []
  );
  const questions: NewsData[] = allArticles.slice(1, 5);

  return (
    <div className="border border-neutral-300 bg-[#f5f5f5]">
      {questions.map((news, index) => (
        <div
          key={news.id ?? index}
          className="min-w-0 border-b border-neutral-300 px-3 py-4 last:border-b-0 sm:px-4 sm:py-5"
        >
          <p className="mb-3 text-[11px] font-bold uppercase tracking-wide text-red-700">প্রধান খবর</p>
          <h3 className="break-words text-base font-bold leading-relaxed text-neutral-900 sm:text-[1.08rem]">{news.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
