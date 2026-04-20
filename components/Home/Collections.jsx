import React from 'react';
import Link from 'next/link';

const collections = [
    {
        title: "Premium T-Shirts",
        description: "100% Organic Pima Cotton",
        image: "/assets/tshirt_collection.png",
        span: "md:col-span-2",
        delay: "0"
    },
    {
        title: "Heritage Polos",
        description: "Interlock & Piqué Weaves",
        image: "/assets/polo_collection.png",
        span: "md:col-span-1",
        delay: "100"
    },
    {
        title: "Urban Hoodies",
        description: "Heavyweight Brushed Fleece",
        image: "/assets/hoodie_collection.png",
        span: "md:col-span-1",
        delay: "200"
    },
    {
        title: "Fine Sweaters",
        description: "Merino & Cashmere Blends",
        image: "/assets/sweater_collection.png",
        span: "md:col-span-2",
        delay: "300"
    }
];

const Collections = () => {
    return (
        <section className="bg-[#FAF9F6] py-24 lg:py-32">
            <div className="container mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16 lg:mb-24" data-aos="fade-up">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Our Core Collections</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Precision manufacturing for the essentials of modern wardrobes.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {collections.map((item, index) => (
                        <div 
                            key={index}
                            className={`relative overflow-hidden rounded-xl group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 h-[300px] lg:h-[450px] ${item.span}`}
                            data-aos="fade-up"
                            data-aos-delay={item.delay}
                        >
                            {/* Image Background */}
                            <img 
                                src={item.image} 
                                alt={item.title} 
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                            
                            {/* Content */}
                            <div className="absolute bottom-0 left-0 p-8 lg:p-10 w-full">
                                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-sm lg:text-base text-gray-300 font-medium uppercase tracking-wider">{item.description}</p>
                                
                                {/* Hover Indicator - subtle line that grows */}
                                <div className="mt-4 h-0.5 w-0 bg-brand-green group-hover:w-16 transition-all duration-500"></div>
                            </div>

                            {/* Link Mask */}
                            <Link href={`/collections/${item.title.toLowerCase().replace(' ', '-')}`} className="absolute inset-0 z-10">
                                <span className="sr-only">View {item.title}</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Collections;
