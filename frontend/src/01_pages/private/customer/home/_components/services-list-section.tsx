import { Card } from "@/components/ui/card";
import { Link } from "react-router";

type ServiceListSectionProps = {
  withHeader?: boolean;
};

const ServiceListSection = ({ withHeader }: ServiceListSectionProps) => {

  const services = [
    {
      slug: "car-upgrade",
      title: "Car Upgrade",
      desc: "Enhance your ride with performance and style upgrades handled by our experts.",
      img: "https://delivery.contenthub.allstate.com/api/public/content/96314d3c0fa14d3ca24b5023dc724f89?v=60936913",
    },
    {
      slug: "computer-upgrade",
      title: "Computer Upgrade",
      desc: "Boost speed and reliability with professional hardware and software upgrades.",
      img: "https://images.ctfassets.net/16nm6vz43ids/7zlh5Fow8bee8cJQQ0hsxm/d35927490f11e1a7c098515eb61bed2f/Upgrading_computer_video_card.png?fm=webp&q=65",
    },
    {
      slug: "repair",
      title: "Repair",
      desc: "Fast, reliable, and affordable repair services to keep your devices in top condition.",
      img: "https://www.shutterstock.com/image-photo/asian-technician-repairing-smartphones-motherboard-600nw-1079627714.jpg",
    },
  ];

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
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(({ slug, title, desc, img }) => (
          <Link
            key={slug}
            to={`/service/${slug}`}
            className="group block focus:outline-none"
          >
            <Card className="overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition">
              {/* Image with title overlay */}
              <div className="relative h-48">
                <img
                  src={img}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <h2 className="absolute bottom-3 left-4 text-white text-xl font-semibold">
                  {title}
                </h2>
              </div>

              {/* Description below the image */}
              <div className="p-4">
                <p className="text-sm text-gray-700">{desc}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ServiceListSection;
