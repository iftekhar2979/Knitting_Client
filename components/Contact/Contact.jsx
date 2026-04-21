"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Globe } from 'lucide-react';

const Contact = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const contactInfo = [
        {
            icon: Phone,
            title: "Phone Number",
            details: ["01711-344139", "01716-019843"],
            color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
        },
        {
            icon: Mail,
            title: "Email Address",
            details: ["kamrul@tertiaryckf.com", "kamrulislamtextile@gmail.com"],
            color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
        },
        {
            icon: MapPin,
            title: "Office Location",
            details: ["Near Rubel Pump, Rajabari road,", "Konabari, Gazipur, Bangladesh"],
            color: "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400"
        }
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
                            Contact Us
                        </span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
                            Let's Build Something <span className="text-emerald-600">Great Together</span>
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            Have a question or looking for a quote? Our team is ready to help you with your next textile project.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {contactInfo.map((info, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-xl shadow-gray-100 dark:shadow-none border border-gray-100 dark:border-gray-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all group"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${info.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <info.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{info.title}</h3>
                            {info.details.map((detail, idx) => (
                                <p key={idx} className="text-gray-600 dark:text-gray-400">{detail}</p>
                            ))}
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-gray-200 dark:shadow-none border border-gray-100 dark:border-gray-800"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Send us a Message</h3>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Your Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="John Doe" 
                                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-emerald-500 dark:text-white outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                                    <input 
                                        type="email" 
                                        placeholder="john@example.com" 
                                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-emerald-500 dark:text-white outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Subject</label>
                                <input 
                                    type="text" 
                                    placeholder="How can we help?" 
                                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-emerald-500 dark:text-white outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Message</label>
                                <textarea 
                                    rows="5" 
                                    placeholder="Your message here..." 
                                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-emerald-500 dark:text-white outline-none resize-none transition-all"
                                ></textarea>
                            </div>
                            <button className="w-full group flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-200 dark:shadow-none active:scale-95">
                                Send Message
                                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>
                    </motion.div>

                    {/* FAQ/Info Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h3>
                            <div className="space-y-4">
                                {[
                                    { q: "What is your minimum order quantity?", a: "We cater to both small boutique orders and large-scale wholesale production. Contact us for specific details." },
                                    { q: "Do you ship internationally?", a: "Yes, we are a 100% export-oriented manufacturer and ship our knit fabrics globally." },
                                    { q: "Can I request custom fabric samples?", a: "Absolutely! We provide samples for quality assessment and custom development." }
                                ].map((faq, i) => (
                                    <div key={i} className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                                        <p className="font-bold text-gray-900 dark:text-white mb-2">{faq.q}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{faq.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-emerald-600 p-8 rounded-[2.5rem] text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                            <div className="relative z-10">
                                <h4 className="text-xl font-bold mb-4">Emergency Support?</h4>
                                <p className="text-emerald-50 mb-6 text-sm opacity-90 leading-relaxed">
                                    Our technical team is available for urgent consultations regarding fabric specifications and production timelines.
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="font-bold">24/7 Response for Partners</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;