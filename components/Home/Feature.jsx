import Link from 'next/link';

const Feature = (props) => {
    return (
        <section className="bg-white overflow-hidden">
            {/* Stats Bar */}
            <div className="bg-brand-bg border-y border-gray-100 py-12 lg:py-16">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
                        <div className="flex-1 flex flex-col items-center md:items-start group" data-aos="fade-up">
                            <span className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2 group-hover:text-brand-green transition-colors duration-300">10+</span>
                            <span className="text-xs lg:text-sm font-bold uppercase tracking-widest text-gray-500">Years Experience</span>
                        </div>
                        <div className="hidden md:block w-px h-12 bg-gray-200"></div>
                        <div className="flex-1 flex flex-col items-center md:items-start group" data-aos="fade-up" data-aos-delay="100">
                            <span className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2 group-hover:text-brand-green transition-colors duration-300">50+</span>
                            <span className="text-xs lg:text-sm font-bold uppercase tracking-widest text-gray-500">Clients Worldwide</span>
                        </div>
                        <div className="hidden md:block w-px h-12 bg-gray-200"></div>
                        <div className="flex-1 flex flex-col items-center md:items-start group" data-aos="fade-up" data-aos-delay="200">
                            <span className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2 group-hover:text-brand-green transition-colors duration-300">1.2M</span>
                            <span className="text-xs lg:text-sm font-bold uppercase tracking-widest text-gray-500">Units Per Annum</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Feature Content */}
            <div className="container mx-auto px-6 lg:px-8 py-24 lg:py-32">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    {/* Visual Side */}
                    <div className="flex-1 w-full" data-aos="fade-right">
                        <div className="relative aspect-square overflow-hidden rounded-md shadow-2xl">
                            <img 
                                src="/assets/feature_texture.png" 
                                alt="Knitted Texture Craftsmanship" 
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                            {/* Subtle overlay */}
                            <div className="absolute inset-0 bg-brand-green/5 mix-blend-multiply"></div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="flex-1 text-left" data-aos="fade-left" data-aos-delay="200">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-green mb-6 block">
                            Expertise & Heritage
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.2] mb-10">
                            Crafting Excellence in <br/> Every Stitch
                        </h2>
                        
                        <div className="space-y-6 text-lg text-gray-600 leading-relaxed max-w-xl">
                            <p>
                                Based at the heart of textile innovation, Tertiary Knity combines 
                                traditional craftsmanship with disruptive manufacturing technologies. 
                                We specialize in high-end knit garments that meet the rigorous 
                                standards of global fashion houses.
                            </p>
                            <p>
                                Our commitment to global export standards ensures that every 
                                piece leaving our facility is a testament to quality, durability, 
                                and ethical production.
                            </p>
                        </div>

                        <div className="mt-12">
                            <Link 
                                href="/sustainability"
                                className="inline-flex items-center gap-4 text-brand-green font-bold group"
                            >
                                <span className="border-b-2 border-brand-green pb-1 group-hover:pr-4 transition-all duration-300">
                                    Our Sustainability Charter
                                </span>
                                <span className="h-0.5 w-12 bg-brand-green group-hover:w-20 transition-all duration-300"></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Feature;