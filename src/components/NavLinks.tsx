import React from 'react';
import Link from 'next/link';

interface NavData {
  slug: string;
  title: string;
  topicId: number | null;
  url: string;
  scrapable: boolean;
}

const NavLinks = async () => {
  const res = await fetch('https://news-api-v2.vercel.app/api/categories');
  const data = await res.json();
  const navs: NavData[] = data.data ?? [];
  const filteredNavs = navs.filter((n) => n.scrapable);

  return (
    <nav className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-start gap-5 overflow-x-auto px-4 py-3 text-center text-sm font-medium text-neutral-900 sm:justify-center sm:gap-x-6 sm:text-base">
        <Link href="/" className="shrink-0 whitespace-nowrap transition hover:text-red-700">হোম</Link>
        {filteredNavs.map((n, i) => (
          <Link key={`${n.slug}-${i}`} href={`/category/${n.slug}`} className="shrink-0 whitespace-nowrap transition hover:text-red-700">
            {n.title}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavLinks;