import type { Service } from "@/04_types/service/service";
import PageHeader from "@/components/typography/page-header";
import { Card } from "@/components/ui/card";
import useTanstackPaginateQuery from "@/hooks/tanstack/use-tanstack-paginate-query";
import { Link } from "react-router";

const ServiceListSection = () => {

  // Tanstack query hook for pagination
  const tasksPagination = useTanstackPaginateQuery<Service>({
    endpoint: '/services',
    defaultSort: 'id',
  });

  return (
    <>
      {/* Header + Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <PageHeader
          className="text-2xl font-bold text-gray-800 tracking-tight"
        >
          Our Services
        </PageHeader>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasksPagination.data?.records ? (
          tasksPagination.data.records.map((item) => (
            <Link
              key={item.slug}
              to={`/service/${item.slug}`}
              className="group block focus:outline-none"
            >
              <Card className="overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition">
                {/* Image with title overlay */}
                <div className="relative h-48">
                  <img
                    src={item.thumbnail_path}
                    alt={item.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                  <h2 className="absolute bottom-3 left-4 text-white text-xl font-semibold">
                    {item.label}
                  </h2>
                </div>

                {/* Description below the image */}
                <div className="p-4">
                  <p className="text-sm text-gray-700">{item.description}</p>
                </div>
              </Card>
            </Link>
          ))
        ) : null}


      </div>
    </>
  );
};

export default ServiceListSection;
