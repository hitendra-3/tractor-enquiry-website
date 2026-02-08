import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Cinematic Background with Zoom Effect */}
            {/* Static Cinematic Background */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1594771804886-a933bb2d609b?q=80&w=2364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                }}
            >
                {/* Darker Gradient Overlay for better contrast and matching the dark theme */}
                <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/70 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-transparent to-dark/40"></div>
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-6 relative z-10 text-center md:text-left h-full flex flex-col justify-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="inline-flex items-center gap-2 py-2 px-4 border border-primary/30 rounded-full bg-dark/50 backdrop-blur-md mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">Professional Tractor Care</span>
                    </motion.div>

                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-oswald font-black text-white mb-6 leading-none tracking-tight drop-shadow-2xl">
                        POWER <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">MEETS</span> <br />
                        <span className="text-primary relative inline-block">
                            PERFORMANCE
                            <motion.svg
                                className="absolute -bottom-2 left-0 w-full h-3 text-primary"
                                viewBox="0 0 100 10"
                                preserveAspectRatio="none"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1, delay: 1 }}
                            >
                                <motion.path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                            </motion.svg>
                        </span>
                    </h1>

                    <p className="text-gray-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-light tracking-wide md:mx-0 mx-auto">
                        Revitalize your agricultural machinery with FixIt's world-class repair services. We keep your farm moving forward.
                    </p>

                    <div className="flex flex-col md:flex-row gap-6 justify-center md:justify-start items-center">
                        <Link
                            to="/services"
                            className="group relative px-8 py-4 bg-primary text-white font-oswald font-bold tracking-widest uppercase overflow-hidden shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow"
                        >
                            <span className="relative z-10 flex items-center gap-3 group-hover:gap-4 transition-all">
                                Explore Services <ArrowRight className="h-5 w-5" />
                            </span>
                            <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0 opacity-20"></div>
                        </Link>

                        <Link
                            to="/contact"
                            className="px-8 py-4 text-white font-oswald font-bold tracking-widest uppercase border border-white/10 hover:border-primary hover:text-primary transition-all backdrop-blur-sm bg-white/5"
                        >
                            Contact Support
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 text-white flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-[0.2em] opacity-70">Scroll Down</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <ChevronDown className="h-6 w-6 text-primary" />
                </motion.div>
            </motion.div>
        </section>
    );
}
