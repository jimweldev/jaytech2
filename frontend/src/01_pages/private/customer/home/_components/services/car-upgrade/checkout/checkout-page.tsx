import PageHeader from "@/components/typography/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FaChevronLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const CheckOutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Back Button */}
      <Button
        onClick={() => navigate(-1)}
        variant="ghost"
        className="mb-6 text-gray-600 hover:text-gray-800"
      >
        <FaChevronLeft className="inline-block mr-2 h-4 w-4" />
        Back
      </Button>

      {/* Responsive two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* LEFT COLUMN: Order Details */}
        <div className="md:col-span-2 order-2 md:order-1 space-y-4">
          <Card className="shadow-sm">
            <CardBody className="space-y-4">
              <PageHeader className="my-2 text-lg">Delivery Method</PageHeader>
              <p className="text-sm text-gray-600">
                This section can contain your checkout form, shipping address, or any additional notes for the order.
              </p>
            </CardBody>
          </Card>

          <Card className="shadow-sm">
            <CardBody className="space-y-4">
              <PageHeader className="my-2 text-lg">Payment Method</PageHeader>
              <p className="text-sm text-gray-600">
                This section can contain your payment options, billing info, or any additional notes for the order.
              </p>
            </CardBody>
          </Card>
        </div>

        {/* RIGHT COLUMN: Summary + Image */}
        <div className="md:col-span-1 order-1 md:order-2">
          <Card className="h-full shadow-sm">
            <div className="bg-gray-100 flex justify-center p-4">
              <img
                src="https://www.apple.com/newsroom/images/2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max/article/Apple-iPhone-17-Pro-color-lineup-250909_inline.jpg.large.jpg"
                alt="Selected Service"
                className="w-full max-w-xs rounded-lg object-cover"
              />
            </div>

            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">[Service Name]</CardTitle>
            </CardHeader>

            <CardBody className="space-y-4 text-gray-700">
              <div className="flex items-center justify-between w-full">
                <Label htmlFor="brand" className="text-sm font-medium text-gray-600">Brand</Label>
                <p className="text-base font-semibold text-gray-800">[Brand Name]</p>
              </div>

              <div className="flex items-center justify-between w-full">
                <Label htmlFor="model" className="text-sm font-medium text-gray-600">Model</Label>
                <p className="text-base font-semibold text-gray-800">[Model Name]</p>
              </div>

              <hr className="border-gray-200" />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>$120.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>$12.00</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-900">
                  <span>Total</span>
                  <span>$132.00</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
