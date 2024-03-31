import Image from 'next/image';
import react from 'react';
import knittingHero from '@/assets/knittingHero.png'

const Hero = (props) => {
    return (
        <div
        data-aos="fade-right"
            className="container relative mx-auto overflow-hidden px-4 py-16 lg:px-8 lg:py-32 xl:max-w-6xl"
          >
            <div className="text-center">
              <h2 className="mb-4 text-3xl font-black md:text-5xl">
              Knit Beyond <span className="text-blue-600">Imagination</span>
              </h2>
              <h3
             
                className="mx-auto text-balance text-lg font-medium text-gray-500 md:text-xl md:leading-relaxed lg:w-2/3"
              >
                Premium Knit Fabrics for Every Design. Where Quality Meets Innovation in Textile Excellence
              </h3>
            </div>
            <div className="flex flex-wrap justify-center gap-4 pb-24 pt-10">
              <a
                href="javascript:void(0)"
                className="inline-flex items-center justify-center gap-2 rounded bg-blue-700 px-6 py-3 font-semibold leading-6 text-white transition hover:border-blue-800 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 active:border-blue-700 active:bg-blue-700"
              >
                <span>Get Contact</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  data-slot="icon"
                  className="hi-mini hi-arrow-right inline-block size-5 opacity-50"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="javascript:void(0)"
                className="inline-flex items-center justify-center gap-2 rounded bg-gray-700 px-6 py-3 font-semibold leading-6 text-white transition hover:border-gray-800 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring focus:ring-gray-500 focus:ring-opacity-50 active:border-gray-700 active:bg-gray-700"
              >
                <span>Learn More</span>
              </a>
            </div>
            <div
              className="relative rounded-xl bg-white p-2 shadow-lg ring-1 ring-blue-100 lg:mx-40 lg:flex lg:items-center lg:justify-center"
            >
              <div
                className="absolute left-0 top-0 -ml-20 -mt-12 h-48 w-48 rounded-full bg-blue-200 bg-opacity-50"
              ></div>
              <div
                className="absolute right-0 top-0 -mr-16 -mt-20 h-32 w-32 rotate-3 rounded-xl bg-green-200 bg-opacity-50"
              ></div>
              <div
                className="absolute bottom-0 right-0 -mb-10 -mr-16 h-40 w-40 rounded-full bg-gray-200 bg-opacity-50"
              ></div>
              <div
                className="absolute bottom-0 left-0 -mb-16 -ml-12 h-20 w-20 -rotate-12 rounded-xl bg-red-200 bg-opacity-50"
              ></div>
              <div className="aspect-w-16 aspect-h-10 w-full" data-aos="fade-right">
                <Image src={knittingHero} alt='Knitting Machine' loading='lazy'	quality={80}/>
              </div>
            </div>
          </div>
    )
};
export default Hero;