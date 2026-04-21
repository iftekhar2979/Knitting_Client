"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const Contact = () => {
    const contactInfo = [
        {
            icon: Phone,
            title: "Call or WhatsApp",
            items: [
                { label: "Primary: 01711-344139", value: "+8801711344139", type: "phone" },
                { label: "Secondary: 01716-019843", value: "+8801716019843", type: "phone" }
            ],
            color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
        },
        {
            icon: Mail,
            title: "Email Address",
            items: [
                { label: "kamrul@tertiaryckf.com", value: "kamrul@tertiaryckf.com", type: "email" },
                { label: "kamrulislamtextile@gmail.com", value: "kamrulislamtextile@gmail.com", type: "email" }
            ],
            color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
        }
    ];

    const faqs = [
        { q: "What is your minimum order quantity?", a: "We cater to both small boutique orders and large-scale wholesale production. Contact us for specific details." },
        { q: "Do you ship internationally?", a: "Yes, we are a 100% export-oriented manufacturer and ship our knit fabrics globally." },
        { q: "Can I request custom fabric samples?", a: "Absolutely! We provide samples for quality assessment and custom development." }
    ];

    return (
        <section className="relative bg-white dark:bg-gray-950 py-16 md:py-24 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-200 blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200 blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
                            Get In Touch
                        </span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
                            Let's Build Something <span className="text-emerald-600">Great Together</span>
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Whether you're looking for fabric solutions or technical textiles, our team in Gazipur is ready to assist you.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left Column: Contact Methods */}
                    <div className="lg:col-span-4 space-y-6">
                        {contactInfo.map((info, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-xl shadow-gray-100 dark:shadow-none border border-gray-100 dark:border-gray-800"
                            >
                                <div className={`w-12 h-12 rounded-xl ${info.color} flex items-center justify-center mb-6`}>
                                    <info.icon className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{info.title}</h3>
                                <div className="space-y-4">
                                    {info.items.map((item, idx) => (
                                        <div key={idx} className="space-y-3">
                                            {item.type === 'phone' ? (
                                                <div className="flex flex-col gap-2">
                                                    <p className="text-sm font-semibold text-gray-500">{item.label}</p>
                                                    <div className="flex gap-2">
                                                        <Button asChild variant="outline" className="flex-1 rounded-xl border-blue-100 hover:bg-blue-50 text-blue-600 dark:border-blue-900/30 dark:hover:bg-blue-900/20">
                                                            <a href={`tel:${item.value}`}>
                                                                <Phone className="w-4 h-4 mr-2" /> Call
                                                            </a>
                                                        </Button>
                                                        <Button asChild variant="outline" className="flex-1 rounded-xl border-emerald-100 hover:bg-emerald-50 text-emerald-600 dark:border-emerald-900/30 dark:hover:bg-emerald-900/20">
                                                            <a href={`https://wa.me/${item.value.replace('+', '')}`} target="_blank" rel="noopener noreferrer">
                                                                <MessageSquare className="w-4 h-4 mr-2" /> WhatsApp
                                                            </a>
                                                        </Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <a 
                                                    href={`mailto:${item.value}`}
                                                    className="group flex items-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center mr-3 shadow-sm">
                                                        <Mail className="w-4 h-4 text-emerald-600" />
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 truncate">
                                                        {item.label}
                                                    </span>
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}

                        {/* Emergency Card moved here */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="bg-emerald-600 p-8 rounded-[2rem] text-white relative overflow-hidden shadow-lg shadow-emerald-200 dark:shadow-none"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <Clock className="w-5 h-5" />
                                    <h4 className="font-bold">24/7 Response</h4>
                                </div>
                                <p className="text-emerald-50 text-sm opacity-90 leading-relaxed mb-4">
                                    Our technical team is available for urgent consultations regarding fabric specifications.
                                </p>
                                <Button asChild className="w-full bg-white text-emerald-600 hover:bg-emerald-50 rounded-xl font-bold">
                                    <a href="tel:+8801711344139">Emergency Call</a>
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Middle Column: Form */}
                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-gray-900 p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-gray-200 dark:shadow-none border border-gray-100 dark:border-gray-800"
                        >
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center md:text-left">Send us a Message</h3>
                            <form className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Your Name</Label>
                                    <Input placeholder="Full Name" className="h-12 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus-visible:ring-2 focus-visible:ring-emerald-500" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Email Address</Label>
                                    <Input type="email" placeholder="email@company.com" className="h-12 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus-visible:ring-2 focus-visible:ring-emerald-500" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Subject</Label>
                                    <Input placeholder="How can we help?" className="h-12 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus-visible:ring-2 focus-visible:ring-emerald-500" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Message</Label>
                                    <Textarea rows={4} placeholder="Tell us about your project requirements..." className="rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus-visible:ring-2 focus-visible:ring-emerald-500 resize-none" />
                                </div>
                                <Button className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg shadow-emerald-200 dark:shadow-none flex gap-3">
                                    Send Message
                                    <Send className="w-5 h-5" />
                                </Button>
                            </form>
                        </motion.div>
                    </div>

                    {/* Right Column: FAQs */}
                    <div className="lg:col-span-3 space-y-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Help</h3>
                        {faqs.map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800"
                            >
                                <p className="font-bold text-gray-900 dark:text-white mb-2 text-sm">{faq.q}</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Map Section with Unified Location */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 relative group"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-[3rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                    <div className="relative h-[500px] w-full overflow-hidden rounded-[3rem] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-2xl">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3644.2052441995713!2d90.3328703760456!3d24.008437578500287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755dd003cc51693%3A0xd7288f324d227ad2!2sTertiary%20Colour%20Knit%20Fabrics!5e0!3m2!1sen!2sbd!4v1713696800000!5m2!1sen!2sbd"
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            className="grayscale contrast-125 opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                        ></iframe>
                        
                        {/* Final Location Anchor Card */}
                        <div className="absolute bottom-8 left-8 right-8 md:right-auto md:max-w-sm">
                            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-white/20">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white">Our Factory</h4>
                                        <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider">Gazipur, Bangladesh</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                    Near Rubel Pump, Rajabari road, Konabari, Gazipur. 
                                    Our facility is open for technical visits by appointment.
                                </p>
                                <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-200 dark:shadow-none">
                                    <a 
                                        href="https://www.google.com/maps/place/Tertiary+Colour+Knit+Fabrics/@24.0084376,90.335059" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        Get Driving Directions
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;