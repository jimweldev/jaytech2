import useCarousel from '@/hooks/fancybox/use-carousel';
import ServiceListSection from './_components/services-list-section';
import WelcomeSection from './_components/welcome-section';
import TrackerSection from './_components/tracker-section';
import ClientLogoSection from './_components/client-logos-section';
import FooterSection from './_components/footer-section';
import FixListSection from './_components/fix-list-section';

const HomePage = () => {
  const [carouselRef] = useCarousel();

  const imgs = [
    "https://picsum.photos/seed/car1/800/500",
    "https://picsum.photos/seed/car2/800/500",
    "https://picsum.photos/seed/car3/800/500",
    "https://picsum.photos/seed/car4/800/500",
    "https://picsum.photos/seed/car5/800/500",
  ];

  return (
    <>
      <div className="customer-container p-layout flex flex-col gap-4">
        {/* Carousel */}
        <div
          ref={carouselRef}
          id="myCarousel"
          className="f-carousel h-[500px] w-full"
        >
          {imgs.map((src, i) => (
            <div key={i} className="f-carousel__slide h-full w-full">
              <img
                src={src}
                alt={`Slide ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Welcome */}
      <WelcomeSection />

      <div className="customer-container p-layout flex flex-col gap-4">
        {/* Tracker */}
        <TrackerSection />

        {/* Services */}
        <ServiceListSection />
      </div>

      {/* Client Logos */}
      <ClientLogoSection />

      <div className="customer-container p-layout flex flex-col gap-4">
        {/* Fixes */}
        <FixListSection />
      </div>

      {/* Footer */}
      <FooterSection />

    </>
  );
};

export default HomePage;
