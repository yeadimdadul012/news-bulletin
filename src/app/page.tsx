import MainNews from '@/components/MainNews';
import MostReadNews from '@/components/MostReadNews';
import OtherNews from '@/components/OtherNews';
import QuestionList from '@/components/QuestionList';

export default function Home() {
  return (
    <main className="bg-[#f4f4f4] pb-10">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-[1.1fr_1.2fr_0.9fr]">
          <MainNews />
          <QuestionList />
          <div className="md:col-span-2 xl:col-span-1">
            <MostReadNews />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <OtherNews />
      </div>
    </main>
  );
}
