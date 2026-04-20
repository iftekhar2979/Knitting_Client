import Link from 'next/link';
import React from 'react';

const Hero = (props) => {
  return (
    <section className="relative overflow-hidden bg-brand-bg pt-16 pb-24 lg:pt-32 lg:pb-52">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content */}
          <div className="flex-1 text-left z-10" data-aos="fade-up">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.1] mb-8">
              Premium Knitwear <br/>
              <span className="text-brand-green">Manufacturing</span> <br/>
              for Global Brands
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 max-w-xl mb-10 leading-relaxed">
              High-quality, sustainable, and scalable garment solutions 
              engineered with industrial precision and tactile elegance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-green px-8 py-4 text-sm font-bold text-white transition-all hover:bg-brand-accent shadow-lg shadow-brand-green/20"
              >
                Get a Quote
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                     d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center rounded-md bg-brand-gray px-8 py-4 text-sm font-bold text-gray-900 transition-all hover:bg-gray-300"
              >
                View Portfolio
              </Link>
            </div>
          </div>

          {/* Right Visual (Circular Mask) */}
          <div className="flex-1 relative" data-aos="zoom-in" data-aos-delay="200">
            <div className="relative w-full aspect-square max-w-[600px] mx-auto overflow-hidden rounded-full border-8 border-white shadow-2xl">
              <img 
                src="/assets/hero_banner.png" 
                alt="Premium Knitwear Textures" 
                className="w-full h-full object-cover scale-110 hover:scale-125 transition-transform duration-1000 ease-out"
              />
              {/* Halftone Overlay Effect */}
              <div className="absolute inset-0 bg-brand-green/5 mix-blend-multiply pointer-events-none"></div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#D9E2DF] rounded-full -z-10 blur-3xl opacity-60"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-brand-green/10 rounded-full -z-10 blur-3xl opacity-40"></div>
          </div>
        </div>
      </div>
    </section>
  )
};

export default Hero;