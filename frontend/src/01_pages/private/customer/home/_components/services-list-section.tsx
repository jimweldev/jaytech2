import { Card, CardBody } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Link } from "react-router";

type ServiceListSectionProps = {
  withHeader?: boolean;
};

const ServiceListSection = ({ withHeader }: ServiceListSectionProps) => {
  // sample data
  const services = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    title: `Service ${i + 1}`,
    description:
      "We specialize in fast, reliable, and affordable repair services to get your device back in top condition.",
  }));

  return (
    <>
      {/* Header + Search */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1
          className="text-2xl font-bold text-gray-800 tracking-tight"
          hidden={!withHeader}
        >
          Our Services
        </h1>

        <div className="w-full md:w-72">
          {/* <Input
            type="text"
            placeholder="Search services..."
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
          /> */}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((svc) => (
          <Link key={svc.id} to={`/service/${svc.id}`} className="block">
            <Card className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
              <CardBody className="flex flex-col h-full p-6">
                {/* icon placeholder */}
                <div className="mb-4 text-4xl text-blue-500">📱</div>

                {/* title */}
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {svc.title}
                </h2>

                {/* description */}
                <p className="text-sm text-gray-600 flex-grow">
                  {svc.description}
                </p>

                {/* plus button */}
                <div className="mt-6">
                  <button
                    aria-label="View details"
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ServiceListSection;
