import type { ServiceBrand } from "@/04_types/service/service-brand";
import { Input } from "@/components/ui/input";
import useTanstackPaginateQuery from "@/hooks/tanstack/use-tanstack-paginate-query";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const CarBrandPage = () => {
    const [selectedBrand, setSelectedBrand] = useState([] as ServiceBrand | any);
    const modelsRef = useRef<HTMLDivElement | null>(null);

    // Tanstack query hook for pagination
    const tasksPagination = useTanstackPaginateQuery<ServiceBrand>({
        endpoint: '/services/brands',
        defaultSort: 'id',
    });

    console.log(selectedBrand)

    const carBrands = [
        { name: "Toyota", image: "https://global.toyota/pages/global_toyota/mobility/toyota-brand/emblem_001.jpg", models: ["Camry", "Corolla", "RAV4", "Highlander", "Sienna"] },
        { name: "Honda", image: "https://live.staticflickr.com/3453/3747525628_5f0fab0ba0_b.jpg", models: ["Civic", "Accord", "CR-V"] },
        { name: "Ford", image: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg", models: ["F-150", "Mustang", "Explorer"] },
        { name: "Chevrolet", image: "https://logos-world.net/wp-content/uploads/2021/03/Chevrolet-Logo.png", models: ["Silverado", "Malibu", "Equinox"] },
        { name: "BMW", image: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg", models: ["3 Series", "X5", "i8"] },
        { name: "Mercedes", image: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg", models: ["C-Class", "E-Class", "GLE"] },
        { name: "Audi", image: "https://di-uploads-pod3.dealerinspire.com/vindeversautohausofsylvania/uploads/2018/10/Audi-Logo-Banner.png", models: ["A4", "Q5", "A6"] },
        { name: "Volkswagen", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/2048px-Volkswagen_logo_2019.svg.png", models: ["Golf", "Passat", "Tiguan"] },
    ];

    // const brand = carBrands.find((b) => b.name === selectedBrand);

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

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {tasksPagination.data?.records ? (
                            tasksPagination.data.records.map((item) => (
                                <button
                                    key={item.label}
                                    onClick={() => setSelectedBrand(item)}
                                    className={`group bg-white rounded-xl border shadow-sm p-6 flex flex-col items-center transition-all duration-300 cursor-pointer ${selectedBrand === item.label
                                        ? "border-blue-500 shadow-md"
                                        : "border-gray-200 hover:border-blue-500 hover:shadow-md"
                                        }`}
                                >
                                    <div className="w-24 h-14 flex items-center justify-center mb-3">
                                        <img
                                            src={item.thumbnail_path}
                                            alt={item.label}
                                            className="object-contain max-h-full transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <h3
                                        className={`text-lg font-semibold ${selectedBrand === item.label
                                            ? "text-blue-600"
                                            : "text-gray-800 group-hover:text-blue-600"
                                            }`}
                                    >
                                        {item.label}
                                    </h3>
                                </button>

                            ))
                        ) : null}


                        {/* {carBrands
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
                            ))} */}
                    </div>
                </div>
            </div>

            {/* Car Models */}
            {selectedBrand && (
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
                            {/* {selectedBrand.services.map((model: any) => (
                                    <Link
                                        key={model}
                                        to={`/cart/checkout`}
                                        className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-4 flex flex-col items-center"
                                    >
                                        <span className="text-lg font-semibold text-gray-800">{model}</span>
                                    </Link>
                                ))} */}

                                   {/* <Link
                                        key={model}
                                        to={`/cart/checkout`}
                                        className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-4 flex flex-col items-center"
                                    >
                                        <span className="text-lg font-semibold text-gray-800">{model}</span>
                                    </Link> */}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CarBrandPage;
