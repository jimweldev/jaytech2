import type { ServiceBrand } from "@/04_types/service/service-brand";
import { Input } from "@/components/ui/input";
import useTanstackQuery from "@/hooks/tanstack/use-tanstack-query";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

const RepairBrandPage = () => {
    const [selectedBrand, setSelectedBrand] = useState([] as ServiceBrand | any);
    const modelsRef = useRef<HTMLDivElement | null>(null);

    // Tanstack query hook for pagination
    const brandRecords = useTanstackQuery<ServiceBrand>({
        endpoint: '/services/brands/by-service/repair',
    });

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
            <div className="container mx-auto py-12 px-2">
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

                    {/* Brand List */}
                    {brandRecords.data?.records?.length ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                            {brandRecords.data.records.map((item) => (
                                <button
                                    key={item.label}
                                    onClick={() => setSelectedBrand(item)}
                                    className={`group bg-white rounded-xl border shadow-sm p-6 flex flex-col items-center transition-all duration-300 cursor-pointer ${selectedBrand.label === item.label
                                        ? "border-blue-500 shadow-md"
                                        : "border-gray-200 hover:border-blue-500 hover:shadow-md"
                                        }`}
                                >
                                    <div className="w-24 h-14 flex items-center justify-center mb-3">
                                        <img
                                            src={item.thumbnail_path || "https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-network-placeholder-png-image_3416659.jpg"}
                                            alt={item.label}
                                            className="object-contain max-h-full transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <h3
                                        className={`text-lg font-semibold ${selectedBrand.label === item.label
                                            ? "text-blue-600"
                                            : "text-gray-800 group-hover:text-blue-600"
                                            }`}
                                    >
                                        {item.label}
                                    </h3>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm mt-6">No phone brands found.</p>
                    )}
                </div>
            </div>

            {/* Phone Models */}
            {selectedBrand.models?.length > 0 ? (
                <div ref={modelsRef} className="container mx-auto py-12 px-2">
                    <div className="max-w-6xl mx-auto text-center">
                        <h2 className="text-3xl sm:text-4xl font-extrabold px-4 tracking-tight text-gray-900 mb-4">
                            Pick Your {selectedBrand.name} Model
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
                            {selectedBrand.models.map((model: any) => (
                                <Link
                                    key={model.id}
                                    to={`/service/repair/${selectedBrand.id}/${model.id}`}
                                    className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-4 flex flex-col items-center"
                                >
                                    <img
                                        src={model.thumbnail_path || "https://static.vecteezy.com/system/resources/previews/011/911/412/non_2x/smartphone-icon-with-transparent-background-free-png.png"} // fallback if no image
                                        alt={model.label}
                                        className="w-24 h-24 object-contain mb-3"
                                    />
                                    <span className="text-lg font-semibold text-gray-800">
                                        {model.label}
                                    </span>
                                </Link>
                            ))}
                        </div>

                    </div>
                </div>
            ) : null}
        </>
    )
}

export default RepairBrandPage