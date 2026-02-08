import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-dark text-gray-400 pt-16 pb-8 border-t border-gray-800">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand & About */}
                    <div>
                        <h2 className="text-2xl font-oswald font-bold text-white mb-6">
                            FIX<span className="text-primary">IT</span>
                        </h2>
                        <p className="mb-6 text-sm leading-relaxed">
                            Since 1999, we have been delivering quality tractor repair services of the top level so that even small farmers could have their equipment fully functional.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                                <a key={index} href="#" className="h-10 w-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all">
                                    <Icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-oswald font-bold text-white mb-6 uppercase tracking-wider">Quick Links</h3>
                        <ul className="space-y-3">
                            {['About Us', 'Services', 'Testimonials', 'Contact Us'].map((item) => (
                                <li key={item}>
                                    <a href={item === 'About Us' ? '/#about' : item === 'Services' ? '/services' : item === 'Contact Us' ? '/contact' : '#'} className="text-sm hover:text-primary transition-colors flex items-center gap-2">
                                        <span className="h-px w-3 bg-primary"></span>
                                        {item}
                                    </a>
                                </li>
                            ))}
                            <li className="pt-4 border-t border-gray-700 mt-4">
                                <a href="/admin/login" className="text-sm font-bold text-gray-300 hover:text-white transition-colors flex items-center gap-2 uppercase tracking-wider">
                                    <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                                    Admin Login
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-oswald font-bold text-white mb-6 uppercase tracking-wider">Services</h3>
                        <ul className="space-y-3">
                            {['Engine Repair', 'Tire Replacement', 'Transmission', 'Diagnostic', 'Maintenance'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-sm hover:text-primary transition-colors flex items-center gap-2">
                                        <span className="h-px w-3 bg-primary"></span>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-oswald font-bold text-white mb-6 uppercase tracking-wider">Get in Touch</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-primary shrink-0 mt-1" />
                                <span className="text-sm">523 Sylvan Ave, 5th Floor<br />Mountain View, CA 94041 USA</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-primary shrink-0" />
                                <span className="text-sm">+1 (844) 123 456 78</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-primary shrink-0" />
                                <span className="text-sm">info@demolink.org</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} FixIt. All rights reserved. Privacy Policy</p>
                </div>
            </div>
        </footer>
    );
}
