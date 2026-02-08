import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import SectionHeader from "../components/SectionHeader";
import ServiceCard from "../components/ServiceCard";
import { Wrench, Settings, Truck, ShieldCheck, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.replace("#", ""));
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [hash]);

    const services = [
        {
            title: "Engine Diagnostics",
            description: "Comprehensive engine analysis using state-of-the-art diagnostic tools to identify issues quickly and accurately.",
            image: "https://www.mannautoservices.co.uk/wp-content/uploads/2025/01/AdobeStock_46733723.jpg",
        },
        {
            title: "Transmission Repair",
            description: "Expert transmission repair and maintenance services to ensure smooth operation and longevity of your machinery.",
            image: "https://img.freepik.com/premium-photo/professional-mechanic-repairing-tractor-transmission-inside-workshop_308072-6428.jpg",
        },
        {
            title: "Hydraulic Systems",
            description: "Specialized maintenance for hydraulic systems, including pumps, valves, and cylinders, to maintain peak performance.",
            image: "https://www.hars.com.tr/upload/traktor-hidrolik-silindirleri-secimi-montaji-ve-bakim-islemleri-1-1162x700.jpg",
        },
    ];

    return (
        <div className="bg-light min-h-screen">
            <Hero />

            {/* About Section */}
            <section id="about" className="py-24 container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2"
                    >
                        <img
                            src="https://www.deere.co.in/assets/images/region-1/products/tractors/john-deere-e-series-cab.jpg"
                            alt="About FixIt"
                            className="rounded-lg shadow-2xl"
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://www.deere.co.in/assets/images/region-1/products/tractors/john-deere-e-series-cab.jpg"; }}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2"
                    >
                        <h4 className="text-primary font-bold uppercase tracking-widest mb-2">About FixIt</h4>
                        <h2 className="text-4xl md:text-5xl font-oswald font-bold text-dark mb-6">
                            SINCE 1999, WE HAVE BEEN DELIVERING QUALITY SERVICES
                        </h2>
                        <div className="w-16 h-1 bg-primary mb-6"></div>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            FixIt was founded with the intention of providing agricultural machinery repair services of the top level so that even small farmers could have their equipment fully functional.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex items-start gap-3">
                                <ShieldCheck className="text-primary h-8 w-8" />
                                <div>
                                    <h5 className="font-bold text-dark">Certified Experts</h5>
                                    <p className="text-sm text-gray-500">Qualified team</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Clock className="text-primary h-8 w-8" />
                                <div>
                                    <h5 className="font-bold text-dark">Fast Service</h5>
                                    <p className="text-sm text-gray-500">On-time delivery</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <SectionHeader
                        title="Our Services"
                        subtitle="We offer a wide range of repair and maintenance services for all types of agricultural machinery."
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <ServiceCard {...service} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 bg-dark text-white relative bg-fixed bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1472559599564-9be939d89230?q=80&w=2070&auto=format&fit=crop')" }}>
                <div className="absolute inset-0 bg-black/80"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <SectionHeader title="Why Choose Us" subtitle="We define quality in every job we undertake." centered={true} lightMode={true} />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        {[
                            { Icon: Wrench, title: "Expert Mechanics", desc: "Our team consists of highly skilled and certified mechanics." },
                            { Icon: Settings, title: "Modern Equipment", desc: "We use the latest tools and diagnostic equipment." },
                            { Icon: Truck, title: "On-Site Service", desc: "We come to your farm to minimize downtime." }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.2 }}
                                className="p-8 border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-primary transition-colors duration-300 group"
                            >
                                <item.Icon className="h-12 w-12 mx-auto mb-4 text-primary group-hover:text-white transition-colors" />
                                <h3 className="text-xl font-oswald font-bold mb-2">{item.title}</h3>
                                <p className="text-gray-400 group-hover:text-white/90">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
