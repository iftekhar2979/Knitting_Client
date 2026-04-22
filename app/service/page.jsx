"use client"
import { motion } from 'framer-motion';
import { Headphones, ShieldCheck, Zap, BarChart3, Truck, Leaf, Star, ArrowRight } from 'lucide-react';

const services = [
    {
        icon: ShieldCheck,
        title: "Premium Quality Assurance",
        description: "Every fabric roll is rigorously tested against international standards. Our quality control pipeline ensures zero-defect delivery on every order.",
        color: "emerald"
    },
    {
        icon: Zap,
        title: "High-Speed Production",
        description: "With state-of-the-art circular knitting machines running 24/7, we deliver tight turnaround times without ever compromising on quality.",
        color: "amber"
    },
    {
        icon: Headphones,
        title: "Dedicated 24/7 Support",
        description: "Our client success team is always available. From order placement to delivery tracking, we handle every detail so you don't have to.",
        color: "sky"
    },
    {
        icon: BarChart3,
        title: "Real-Time Analytics",
        description: "Monitor your order status, production timelines, and shipment tracking in real time through our integrated management console.",
        color: "violet"
    },
    {
        icon: Truck,
        title: "Global Logistics",
        description: "Reliable door-to-door export shipping to over 60 countries. We manage customs, documentation, and Incoterms so your goods arrive on time.",
        color: "rose"
    },
    {
        icon: Leaf,
        title: "Sustainable Practices",
        description: "We are committed to eco-friendly manufacturing, using OEKO-TEX certified yarns and ZDHC-compliant processes to protect our planet.",
        color: "teal"
    }
];

const colorMap = {
    emerald: { bg: "bg-emerald-50 dark:bg-emerald-900/20", icon: "text-emerald-600 dark:text-emerald-400", border: "group-hover:border-emerald-200 dark:group-hover:border-emerald-800", dot: "bg-emerald-500" },
    amber:   { bg: "bg-amber-50 dark:bg-amber-900/20",   icon: "text-amber-600 dark:text-amber-400",   border: "group-hover:border-amber-200 dark:group-hover:border-amber-800",   dot: "bg-amber-500" },
    sky:     { bg: "bg-sky-50 dark:bg-sky-900/20",       icon: "text-sky-600 dark:text-sky-400",       border: "group-hover:border-sky-200 dark:group-hover:border-sky-800",       dot: "bg-sky-500" },
    violet:  { bg: "bg-violet-50 dark:bg-violet-900/20", icon: "text-violet-600 dark:text-violet-400", border: "group-hover:border-violet-200 dark:group-hover:border-violet-800", dot: "bg-violet-500" },
    rose:    { bg: "bg-rose-50 dark:bg-rose-900/20",     icon: "text-rose-600 dark:text-rose-400",     border: "group-hover:border-rose-200 dark:group-hover:border-rose-800",     dot: "bg-rose-500" },
    teal:    { bg: "bg-teal-50 dark:bg-teal-900/20",     icon: "text-teal-600 dark:text-teal-400",     border: "group-hover:border-teal-200 dark:group-hover:border-teal-800",     dot: "bg-teal-500" },
};

const page = (props) => {
    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="relative bg-white dark:bg-gray-950 overflow-hidden">
            {/* Background dot pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] pointer-events-none"
                 style={{ backgroundImage: 'radial-gradient(#059669 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            {/* Hero Header */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 text-center pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-20 px-4 sm:px-6"
            >
                <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-5">
                    What We Offer
                </span>
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight px-2">
                    World-Class Textile <br className="hidden sm:block" />
                    <span className="text-emerald-600">Services & Solutions</span>
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed px-4">
                    From high-speed production to sustainable sourcing, we offer a complete ecosystem of textile manufacturing services tailored to global industry demands.
                </p>
            </motion.div>

            {/* Services Grid */}
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={containerVariants}
                className="relative z-10 container mx-auto px-4 sm:px-6 pb-16 sm:pb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
                {services.map((service, i) => {
                    const colors = colorMap[service.color];
                    return (
                        <motion.div
                            key={i}
                            variants={cardVariants}
                            className={`group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 cursor-default ${colors.border}`}
                        >
                            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl ${colors.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <service.icon className={`w-6 h-6 sm:w-7 sm:h-7 ${colors.icon}`} />
                            </div>

                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3">
                                {service.title}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                                {service.description}
                            </p>

                            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-gray-400 dark:text-gray-600 group-hover:text-emerald-500 transition-colors">
                                <span>Learn More</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* CTA Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative z-10 container mx-auto px-4 sm:px-6 pb-20 sm:pb-28"
            >
                <div className="bg-emerald-600 rounded-2xl sm:rounded-[2.5rem] p-8 sm:p-12 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-emerald-200 dark:shadow-none overflow-hidden">
                    {/* Background glow */}
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-500/30 rounded-full blur-3xl pointer-events-none" />
                    <div className="space-y-3 relative z-10 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2">
                            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-200" />
                            <span className="text-emerald-200 text-[10px] sm:text-xs font-bold uppercase tracking-widest">Trusted by 500+ clients</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
                            Ready to transform <br className="hidden md:block" /> your supply chain?
                        </h3>
                    </div>
                    <button className="w-full sm:w-auto relative z-10 shrink-0 flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-emerald-700 px-8 py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all shadow-md active:scale-95 whitespace-nowrap">
                        Get a Free Quote <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
export default page;