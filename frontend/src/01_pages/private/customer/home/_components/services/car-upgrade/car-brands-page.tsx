import type { ServiceBrand } from "@/04_types/service/service-brand";
import { Input } from "@/components/ui/input";
import useTanstackQuery from "@/hooks/tanstack/use-tanstack-query";
import { useState } from "react";
import { Link } from "react-router-dom";

const CarBrandPage = () => {
    // Tanstack query hook for pagination
    const brandRecords = useTanstackQuery<ServiceBrand>({
        endpoint: '/services/brands/by-service/car-upgrade',
    });

    const [searchTerm, setSearchTerm] = useState("");

    return (
        <>
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-orange-500 to-pink-600 text-white py-16 sm:py-24 mb-4">
                <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
                    <h1 className="text-3xl sm:text-5xl font-extrabold mb-4">Car Upgrade</h1>
                    <p className="text-lg sm:text-xl text-blue-100 mb-8">
                        Experience premium craftsmanship in every key upgrade and vehicle
                        modification reliable, stylish, and built to last.
                    </p>
                </div>
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{
                        backgroundImage:
                            "url('https://media.istockphoto.com/id/1171448706/photo/hand-presses-unlock-on-the-car-remote-control.jpg?s=612x612&w=0&k=20&c=ZbLha8X1Me6G8AixtiClX3LB9DI6PXLoIN5-HGPJ5pk=')",
                    }}
                />
            </div>

            {/* Car Brands */}
            <div className="container mx-auto py-12 px-2">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight px-4 text-gray-900 mb-4">
                        Choose Your Car Brand
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
                                <Link
                                    key={item.id}
                                    to={`/service/car-upgrade/${item.id}`}
                                    className={`group bg-white rounded-xl border shadow-sm p-6 flex flex-col items-center transition-all duration-300 cursor-pointer border-gray-200 hover:border-blue-500 hover:shadow-md}`}
                                >

                                    <div className="w-24 h-14 flex items-center justify-center mb-3">
                                        <img
                                            src={item.thumbnail_path || "https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-network-placeholder-png-image_3416659.jpg"}
                                            alt={item.label}
                                            className="object-contain max-h-full transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <h3
                                        className={`text-lg font-semibold text-gray-800 group-hover:text-blue-600"}`}
                                    >
                                        {item.label}
                                    </h3>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm mt-6">No car brands found.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default CarBrandPage;
