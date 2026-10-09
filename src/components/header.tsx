import React from 'react';
import Image from 'next/image';

const Header = () => {
  const date = new Date().toLocaleDateString('bn-BD', {
    dateStyle: 'full',
  });

  return (
    <header className="border-b border-neutral-200 bg-white px-3 py-3 sm:px-4 sm:py-4">
      <div className="flex min-w-0 items-center justify-center gap-2 sm:gap-4">
        <div>
          <Image
            src="/logo.webp"
            alt ="logo" 
            width={40}
            height={40}
            className="h-8 w-8 sm:h-10 sm:w-10"
            />
        </div>
        <div className="min-w-0 text-center">
          <h1 className="text-[clamp(1.1rem,4vw,1.5rem)] font-black leading-tight tracking-tight text-[#e20707]">Bangla News 24</h1>
          <p className="mt-1 text-[0.65rem] leading-snug text-neutral-700 sm:text-sm">{date}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;