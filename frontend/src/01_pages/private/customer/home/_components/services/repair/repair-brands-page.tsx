import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

const RepairBrandPage = () => {
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const modelsRef = useRef<HTMLDivElement | null>(null);

    const phoneBrands = [
        { name: "Apple", image: "https://images.seeklogo.com/logo-png/15/2/apple-logo-png_seeklogo-158010.png", models: ["iPhone 12", "iPhone 13", "iPhone 14"] },
        { name: "Samsung", image: "https://1000logos.net/wp-content/uploads/2017/06/Samsung-Logo-1993.png", models: ["Galaxy S21", "Galaxy Note 20", "Galaxy Z Fold3"] },
        { name: "Google", image: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", models: ["Pixel 5", "Pixel 6", "Pixel 6a"] },
        { name: "OnePlus", image: "https://1000logos.net/wp-content/uploads/2022/11/OnePlus-Logo.png", models: ["OnePlus 9", "OnePlus 9 Pro", "OnePlus Nord"] },
        { name: "Huawei", image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Huawei_Standard_logo.svg/1181px-Huawei_Standard_logo.svg.png", models: ["P40 Pro", "Mate 40 Pro", "Nova 8"] },
        { name: "Xiaomi", image: "https://upload.wikimedia.org/wikipedia/commons/2/29/Xiaomi_logo.svg", models: ["Mi 11", "Redmi Note 10", "Poco F3"] },
    ];

    const brand = phoneBrands.find((b) => b.name === selectedBrand);

    // scroll to models when brand changes
    useEffect(() => {
        if (selectedBrand && modelsRef.current) {
            modelsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [selectedBrand]);

    const [searchTerm, setSearchTerm] = useState("");
    const [modelSearchTerm, setModelSearchTerm] = useState("");

    return (
        <>
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-green-500 to-emerald-700 text-white py-16 sm:py-24 mb-4">
                <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
                    <h1 className="text-3xl sm:text-5xl font-extrabold mb-4">Repair Services</h1>
                    <p className="text-lg sm:text-xl text-blue-100 mb-8">
                        Fast, reliable, and affordable repair services to keep your devices in top condition.
                    </p>
                </div>
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{
                        backgroundImage:
                            "url('https://www.diyfixtool.com/cdn/shop/articles/05qOG26wzVLHG2nlWpelvCF-1..v1683302270_jpg_JPEG_1600x900_71.png?v=1701080915')",
                    }}
                />
            </div>

            {/* Phone Brands */}
            <div className="container mx-auto py-12">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight px-4 text-gray-900 mb-4">
                        Choose Your Phone Brand
                    </h2>

                    {/* Search Bar */}
                    <div className="mb-6 px-4">
                        <Input
                            className="w-full max-w-md mx-auto"

                            type="text"
                            placeholder="Search brand..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {phoneBrands
                            .filter(({ name }) =>
                                name.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map(({ name, image }) => (
                                <button
                                    key={name}
                                    onClick={() => setSelectedBrand(name)}
                                    className={`group bg-white rounded-xl border shadow-sm p-6 flex flex-col items-center transition-all duration-300 cursor-pointer ${selectedBrand === name
                                        ? "border-blue-500 shadow-md"
                                        : "border-gray-200 hover:border-blue-500 hover:shadow-md"
                                        }`}
                                >
                                    <div className="w-24 h-14 flex items-center justify-center mb-3">
                                        <img
                                            src={image}
                                            alt={name}
                                            className="object-contain max-h-full transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <h3
                                        className={`text-lg font-semibold ${selectedBrand === name
                                            ? "text-blue-600"
                                            : "text-gray-800 group-hover:text-blue-600"
                                            }`}
                                    >
                                        {name}
                                    </h3>
                                </button>
                            ))}
                    </div>
                </div>
            </div>

            {/* Phone Models */}
            {brand && (
                <div ref={modelsRef} className="container mx-auto py-12">
                    <div className="max-w-6xl mx-auto text-center">
                        <h2 className="text-3xl sm:text-4xl font-extrabold px-4 tracking-tight text-gray-900 mb-4">
                            Select Model for {brand.name}
                        </h2>

                        {/* Model Search Bar */}
                        <div className="mb-6 px-4">
                            <Input
                                className="w-full max-w-md mx-auto"
                                type="text"
                                placeholder="Search model..."
                                value={modelSearchTerm}
                                onChange={(e) => setModelSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                            {brand.models
                                .filter((model) =>
                                    model.toLowerCase().includes(modelSearchTerm.toLowerCase())
                                )
                                .map((model) => (
                                    <Link
                                        key={model}
                                        to={`/cart/checkout`}
                                        className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-4 flex flex-col items-center"
                                    >
                                        <span className="text-lg font-semibold text-gray-800">{model}</span>
                                    </Link>
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default RepairBrandPage