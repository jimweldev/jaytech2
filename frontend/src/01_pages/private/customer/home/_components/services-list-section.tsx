import { Card, CardBody } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom"; // ✅ correct package

type ServiceListSectionProps = {
  withHeader?: boolean;
};

const ServiceListSection = ({ withHeader }: ServiceListSectionProps) => {
  return (
    <>
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Heading */}
        <h1
          className="text-2xl font-bold text-gray-800 tracking-tight"
          hidden={!withHeader}
        >
          Services
        </h1>

        {/* Search bar */}
        <div className="w-full md:w-72">
          <Input
            type="text"
            placeholder="Search services..."
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500
                 focus:border-blue-500 shadow-sm"
          />
        </div>
      </div>


      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 justify-start">
        {Array.from({ length: 8 }).map((_, i) => (
          <Link key={i} to={`/service/${i + 1}`} className="block">
            <Card className="aspect-square flex items-center justify-center bg-gray-100 border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-2 cursor-pointer">
              <CardBody className="flex flex-col items-center justify-center">
                <h2 className="text-base md:text-lg font-semibold text-gray-800 text-center">
                  Services {i + 1}
                </h2>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ServiceListSection;
