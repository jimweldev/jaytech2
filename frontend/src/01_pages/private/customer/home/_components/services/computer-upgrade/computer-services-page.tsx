import type { ServiceItem } from "@/04_types/service/service-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useTanstackQuery from "@/hooks/tanstack/use-tanstack-query";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router";

const ComputerServicesPage = () => {
    const navigate = useNavigate();

    // param from url
    const { brand } = useParams();

    // Tanstack query hook for pagination
    const serviceRecords = useTanstackQuery<ServiceItem>({
        endpoint: '/services/items',
        params: `service_brand_category_id=${brand}`,
    });

    const [searchTerm, setSearchTerm] = useState("");

    return (
        <>
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16 sm:py-24 mb-4">
                <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
                    <h1 className="text-3xl sm:text-5xl font-extrabold mb-4">Computer Upgrade</h1>
                    <p className="text-lg sm:text-xl text-blue-100 mb-8">
                        Boost speed and reliability with professional hardware and software upgrades.
                    </p>
                </div>
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{
                        backgroundImage:
                            "url('https://store.hp.com/app/assets/images/uploads/prod/pc-upgrade-guide-hero1548967802272.jpg')",
                    }}
                />
            </div>

            {/* Computer Services */}
            <div className="container mx-auto py-12 px-4">
                <div className="max-w-6xl mx-auto">

                    {/* Back Button */}
                    <div className="flex items-center mb-6">
                        <Button
                            onClick={() => navigate(-1)}
                            variant="ghost"
                            className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
                        >
                            <FaChevronLeft className="h-4 w-4" />
                            Back
                        </Button>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 text-center mb-6">
                        Choose Service
                    </h2>

                    {/* Search Bar */}
                    <div className="mb-8 flex justify-center">
                        <Input
                            className="w-full max-w-md"
                            type="text"
                            placeholder="Search services..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Service List */}
                    {serviceRecords.data?.records?.length ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                            {serviceRecords.data.records.map((item) => (
                                <Link
                                    key={item.id}
                                    to={`/service/computer-upgrade/${brand}/${item.id}`}
                                    className="group bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col items-center transition-all duration-300 hover:border-blue-500 hover:shadow-md"
                                >
                                    <div className="w-20 h-12 flex items-center justify-center mb-3">
                                        <img
                                            src={
                                                item.thumbnail_path ||
                                                "https://img.freepik.com/premium-vector/service-icon_593228-374.jpg"
                                            }
                                            alt={item.label}
                                            className="object-contain max-h-full transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <h3 className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-blue-600">
                                        {item.label}
                                    </h3>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center text-sm mt-6">
                            No computer service found.
                        </p>
                    )}
                </div>
            </div>

        </>
    )
}

export default ComputerServicesPage