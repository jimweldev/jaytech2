import { FaCartPlus } from 'react-icons/fa6';
import { Link, useParams } from 'react-router';
import PageHeader from '@/components/typography/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ServicesListSection from './services-list-section';

const ViewServicePage = () => {
  const { id } = useParams();
  return (
    <>
      <Card className="mb-4 border border-gray-200 shadow-sm">
        <CardBody>
          {/* Responsive grid: 1 column on mobile, 2 on md+ */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Image column */}
            {/* Image column with gray background */}
            <div className="flex items-center justify-center rounded-lg bg-gray-100 p-4">
              <img
                src="https://www.apple.com/newsroom/images/2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max/article/Apple-iPhone-17-Pro-color-lineup-250909_inline.jpg.large.jpg"
                alt={`Service ${id}`}
                className="w-full max-w-sm rounded-lg object-contain"
              />
            </div>

            {/* Details column */}
            <div className="space-y-4 text-sm text-gray-700 md:text-base">
              <CardTitle className="text-lg font-bold text-gray-800 md:text-xl">
                Service {id} Title
              </CardTitle>

              <p>
                This is where you can place detailed information about Service{' '}
                {id}. Add a description, price, or any additional specs you
                need.
              </p>

              <div className="grid w-full items-center gap-3">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  type="text"
                  id="brand"
                  placeholder="Brand"
                  className="w-full text-sm"
                />
              </div>

              <div className="grid w-full items-center gap-3">
                <Label htmlFor="model">Model</Label>
                <Input
                  type="text"
                  id="model"
                  placeholder="Model"
                  className="w-full text-sm"
                />
              </div>

              {/* Buttons */}
              <div className="mt-6 flex flex-col justify-end gap-3 sm:flex-row sm:gap-3">
                {/* Add to Cart */}
                <Button variant="outline">
                  <FaCartPlus className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>

                {/* Book Now */}
                <Button asChild variant="destructive">
                  <Link to={`/service/checkout/${id}`}>
                    <FaCartPlus className="mr-2 h-4 w-4" />
                    Book Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div>
            <PageHeader className="my-2 text-lg">Booking Details</PageHeader>

            <p className="text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </CardBody>
      </Card>

      <ServicesListSection withHeader={false} />
    </>
  );
};

export default ViewServicePage;
