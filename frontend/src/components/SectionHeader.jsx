export default function SectionHeader({ title, subtitle, centered = true, lightMode = false }) {
    return (
        <div className={`mb-12 ${centered ? "text-center" : "text-left"}`}>
            <h2 className={`text-4xl md:text-5xl font-oswald font-bold uppercase mb-4 ${lightMode ? "text-white" : "text-dark"}`}>
                {title}
            </h2>
            {subtitle && (
                <div className={`w-16 h-1 bg-primary mb-6 ${centered ? "mx-auto" : ""}`}></div>
            )}
            {subtitle && (
                <p className={`max-w-2xl mx-auto leading-relaxed ${lightMode ? "text-gray-300" : "text-gray-600"}`}>
                    {subtitle}
                </p>
            )}
        </div>
    );
}
