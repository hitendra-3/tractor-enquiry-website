import { Link } from "react-router-dom";

export default function TractorCard({ tractor }) {
    return (
        <div className="group bg-white shadow-md hover:shadow-xl transition-all duration-300">
            <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                    src={tractor.image || "https://images.unsplash.com/photo-1595245862086-f133d1cb5388?q=80&w=2069&auto=format&fit=crop"}
                    alt={tractor.brand}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1595245862086-f133d1cb5388?q=80&w=2069&auto=format&fit=crop"; }}
                />
                <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 uppercase rounded-sm">
                    {tractor.hp} HP
                </div>
            </div>
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-oswald font-bold text-dark group-hover:text-primary transition-colors">
                        {tractor.brand} {tractor.model}
                    </h3>
                </div>

                <p className="text-gray-500 font-medium mb-4 text-sm uppercase tracking-wide">
                    {tractor.type || "Agricultural Tractor"}
                </p>

                <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                    <span className="text-xl font-bold text-dark">
                        ₹{Number(tractor.price).toLocaleString()}
                    </span>
                    <button
                        className="text-sm font-bold text-gray-500 hover:text-primary uppercase tracking-wider transition-colors"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
}
