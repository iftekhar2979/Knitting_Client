import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-6 pt-20 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center group">
                            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white mr-3 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                                <span className="font-black text-xl">T</span>
                            </div>
                            <span className="text-2xl font-black tracking-tighter text-white leading-none">
                                TERTIARY <span className="text-emerald-500">KNIT</span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-400">
                            100% Export Oriented Knit Fabrics Manufacturer & Supplier. 
                            Delivering industrial precision and sustainable textile solutions globally from Gazipur, Bangladesh.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: Facebook, href: "#" },
                                { icon: Instagram, href: "#" },
                                { icon: Twitter, href: "#" },
                                { icon: Linkedin, href: "#" }
                            ].map((social, i) => (
                                <a key={i} href={social.href} className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all">
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Navigation</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link href="/" className="hover:text-emerald-500 transition-colors">Home</Link></li>
                            <li><Link href="/about" className="hover:text-emerald-500 transition-colors">Our Heritage</Link></li>
                            <li><Link href="/service" className="hover:text-emerald-500 transition-colors">Services</Link></li>
                            <li><Link href="/portfolio" className="hover:text-emerald-500 transition-colors">Portfolio</Link></li>
                            <li><Link href="/contact" className="hover:text-emerald-500 transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Manufacturing */}
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Manufacturing</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li className="hover:text-emerald-500 cursor-default transition-colors">Premium T-Shirts</li>
                            <li className="hover:text-emerald-500 cursor-default transition-colors">Heritage Polos</li>
                            <li className="hover:text-emerald-500 cursor-default transition-colors">Urban Hoodies</li>
                            <li className="hover:text-emerald-500 cursor-default transition-colors">Fine Sweaters</li>
                            <li className="hover:text-emerald-500 cursor-default transition-colors">Custom Knit Structures</li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h4 className="text-white font-bold mb-2 uppercase tracking-widest text-xs">Contact Headquarters</h4>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <MapPin className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                <p className="text-sm text-gray-400">Near Rubel Pump, Rajabari road, Konabari, Gazipur, Bangladesh</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Phone className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                <p className="text-sm text-gray-400">01711-344139</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Mail className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                <p className="text-sm text-gray-400">kamrul@tertiaryckf.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs text-gray-500">
                        &copy; {currentYear} Tertiary Colour Knit Fabrics. All rights reserved.
                    </p>
                    <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-gray-500">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;