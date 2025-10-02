import Marquee from "react-fast-marquee";

const ClientLogoSection = () => {
  const logos = [
    "https://global.toyota/pages/global_toyota/mobility/toyota-brand/emblem_001.jpg",
    "https://live.staticflickr.com/3453/3747525628_5f0fab0ba0_b.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg",
    "https://logos-world.net/wp-content/uploads/2021/03/Chevrolet-Logo.png",
    "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
    "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg",
    "https://di-uploads-pod3.dealerinspire.com/vindeversautohausofsylvania/uploads/2018/10/Audi-Logo-Banner.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/2048px-Volkswagen_logo_2019.svg.png",
  ];

  return (
    <div className="bg-gray-50 py-8 sm:py-12 w-full">
      <Marquee gradient={false} speed={40} className="w-full">
        {logos.map((logo, i) => (
          <div
            key={i}
            className="mx-6 sm:mx-12 flex items-center justify-center 
                       w-20 sm:w-28 md:w-32 
                       h-12 sm:h-14 md:h-16"
          >
            <img
              src={logo}
              alt={`Client logo ${i}`}
              className="object-contain max-h-full grayscale hover:grayscale-0 transition"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default ClientLogoSection;
