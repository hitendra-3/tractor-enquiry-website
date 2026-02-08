import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function ServiceCard({ title, description, image, link = "/services" }) {
    return (
        <div className="group bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="relative h-64 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1581092921461-eab62e97a7823?q=80&w=2070&auto=format&fit=crop"; }}
                />
                <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors"></div>
            </div>
            <div className="p-8 text-center">
                <h3 className="text-2xl font-oswald font-bold text-dark mb-4 group-hover:text-primary transition-colors">
                    {title}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                    {description}
                </p>
                <Link
                    to={link}
                    className="inline-flex items-center text-sm font-bold text-dark hover:text-primary uppercase tracking-wider transition-colors"
                >
                    Read More <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
            </div>
        </div>
    );
}
