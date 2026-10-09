import type { Metadata } from 'next';
import { Noto_Serif_Bengali } from 'next/font/google';
import Header from '@/components/header';
import NavLinks from '@/components/NavLinks';
import './globals.css';
import BreakingNews from '@/components/Marquee';

const notoseribengali = Noto_Serif_Bengali({
  subsets: ['latin', 'bengali'],
});

export const metadata: Metadata = {
  title: 'Bangla News 24',
  description: 'Bangla news home page',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="bn" className={`${notoseribengali.className} h-full antialiased`}>
      <body className="min-h-full bg-[#f5f5f5] text-neutral-900">
        <div className="mx-auto w-full bg-white">
          <div className="mx-auto max-w-7xl">
            <Header />
            <NavLinks />
            <BreakingNews />
          </div>
        </div>
        <div className="mx-auto w-full">{children}</div>
      </body>
    </html>
  );
}
