import React from 'react';
import MarqueeText from 'react-marquee-text';
import 'react-marquee-text/dist/styles.css';

interface MarqueeData {
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  type: string;
  isLive: boolean;
  firstPublished: string;
  lastPublished: string;
  source: string;
}

const Marquee = async () => {
  const res = await fetch('https://news-api-v2.vercel.app/api/news');
  const data = await res.json();
  const headlines: MarqueeData[] = data.data ?? [];

  return (
    <div className="flex min-w-0 items-center bg-[#d92222] text-white leading-none">
      <div className="mx-auto flex w-full max-w-7xl min-w-0 items-center gap-2 overflow-hidden px-3 py-2 sm:px-4">
        <span className="shrink-0 whitespace-nowrap text-xs font-bold uppercase sm:text-sm">সর্বশেষ</span>
        <div className="min-w-0 flex-1 overflow-hidden">
          <MarqueeText direction="right" duration={18} className="overflow-hidden text-xs font-medium leading-normal sm:text-sm">
            {headlines.map((h, index) => (
              <span key={`${h.title}-${index}`} className="inline-flex items-center gap-2 whitespace-nowrap px-2">
                <span className="text-[10px] leading-none">***</span>
                <span>{h.title}</span>
                <span className="text-[10px] leading-none">***</span>
              </span>
            ))}
          </MarqueeText>
        </div>
      </div>
    </div>
  );
};

export default Marquee;