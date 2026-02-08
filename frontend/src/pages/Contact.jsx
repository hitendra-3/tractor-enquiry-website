import { useEffect } from "react";
import SectionHeader from "../components/SectionHeader";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-light pt-24 pb-20">
            <div className="container mx-auto px-6">
                <SectionHeader title="Contact Us" subtitle="Get in touch with us for any inquiries." centered={true} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-primary">
                        <h3 className="text-2xl font-oswald font-bold text-dark mb-6">Contact Information</h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <MapPin className="h-6 w-6 text-primary shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-dark">Address</h4>
                                    <p className="text-gray-600">523 Sylvan Ave, 5th Floor<br />Mountain View, CA 94041 USA</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Phone className="h-6 w-6 text-primary shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-dark">Phone</h4>
                                    <p className="text-gray-600">+1 (844) 123 456 78</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Mail className="h-6 w-6 text-primary shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-dark">Email</h4>
                                    <p className="text-gray-600">info@demolink.org</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.628236556408!2d-122.08369668469227!3d37.42199997982461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba024250945d%3A0xa6caf2b47726f1l!2sGoogleplex!5e0!3m2!1sen!2sus!4v1655734432845!5m2!1sen!2sus"
                                width="100%"
                                height="250"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="rounded-lg shadow-inner"
                            ></iframe>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-oswald font-bold text-dark mb-6">Send Us a Message</h3>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Name</label>
                                    <input type="text" className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Your Name" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Email</label>
                                    <input type="email" className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Your Email" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Subject</label>
                                <input type="text" className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Subject" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Message</label>
                                <textarea rows="5" className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="How can we help you?"></textarea>
                            </div>
                            <button className="w-full bg-primary text-white py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-secondary transition-colors">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
