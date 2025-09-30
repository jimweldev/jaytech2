const WelcomeSection = () => {
    return (
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 sm:py-24 mb-4 overflow-hidden">
            <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
                {/* Heading */}
                <h1 className="text-3xl sm:text-5xl font-extrabold mb-4">
                    Welcome to JayTech
                </h1>

                {/* Subheading / intro */}
                <p className="text-lg sm:text-xl text-blue-100 mb-8">
                    Your one-stop destination for premium upgrades and reliable repairs.
                    Explore our services to keep your ride and devices performing at their best.
                </p>

                {/* Call to action */}
                <a
                    href="#services"
                    className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-full shadow hover:bg-blue-50 transition"
                >
                    View Services
                </a>
            </div>

            {/* Decorative background image */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{
                    backgroundImage:
                        "url('https://static.vecteezy.com/system/resources/previews/010/336/265/large_2x/set-of-repair-tools-in-a-modern-bicycle-and-car-repair-shop-on-a-blue-background-photo.jpg')",
                }}
            />
        </div>

    )
}

export default WelcomeSection