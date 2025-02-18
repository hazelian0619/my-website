import Header from '@/components/layout/Header';
import Research from '@/components/sections/Research';

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <section id="home" className="min-h-screen flex relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex">
            {/* 左侧大图 */}
            <div className="w-1/2 flex items-center">
              <img 
                src="/images/avatar.jpg" 
                alt="Profile" 
                className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            
            {/* 右侧信息 - 采用更优雅的排版 */}
            <div className="w-1/2 flex flex-col justify-center pl-20">
              <h1 className="text-4xl font-extralight tracking-wide mb-8">Lian</h1>
              <div className="space-y-1.5 mb-10 text-neutral-600">
                <p className="text-lg font-light">AI Product Manager & Researcher</p>
                <p className="text-base font-light">Human-Computer Interaction Institute</p>
                <p className="text-base font-light">School of Computer Science</p>
                <p className="text-base font-light">Hong Kong University of Science and Technology</p>
              </div>
              
              <p className="text-sm font-light text-neutral-500 tracking-wide mb-12">
                Social networks | Human-Computer Interaction | 
                Computational social science
              </p>
              
              <div className="flex space-x-6">
                <a href="#bio" className="px-6 py-2 text-sm tracking-wider border border-neutral-200 hover:border-neutral-400 transition-colors uppercase">
                  Biography
                </a>
                <a href="#research" className="px-6 py-2 text-sm tracking-wider border border-neutral-200 hover:border-neutral-400 transition-colors uppercase">
                  Research
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 