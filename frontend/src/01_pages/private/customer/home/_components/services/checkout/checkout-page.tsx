import useServiceBookedItem from "@/05_stores/service/service-booked-items";
import PaymentButton from "@/components/button/payment/payment-button";
import PageHeader from "@/components/typography/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const CheckOutPage = () => {
  const navigate = useNavigate();

  console.log('checkout page loaded');
  const { bookedServices } = useServiceBookedItem();
  console.log(bookedServices)


  const [activeSection, setActiveSection] = useState<"appointment" | "dropPoint" | null>("appointment");

  return (
    <div className="container mx-auto p-4">
      {/* Back Button */}
      <Button
        onClick={() => navigate(-1)}
        variant="ghost"
        className=" text-gray-600 hover:text-gray-800"
      >
        <FaChevronLeft className="inline-block mr-2 h-4 w-4" />
        Back
      </Button>

      {/* Responsive two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* LEFT COLUMN: Booking Details */}
        <div className="md:col-span-2 order-2 md:order-1 space-y-4">
          <Card className="shadow-sm">
            <CardBody className="space-y-4">
              <PageHeader className="my-2 text-lg">Booking Details</PageHeader>

              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button
                  onClick={() => setActiveSection("appointment")}
                  className={`w-full sm:w-auto px-6 py-3 font-semibold transition ${activeSection === "appointment"
                    ? "text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
                    : "text-gray-800 bg-gray-100 hover:bg-gray-200"
                    }`}
                >
                  Book an Appointment
                </Button>

                <Button
                  onClick={() => setActiveSection("dropPoint")}
                  className={`w-full sm:w-auto px-6 py-3 font-semibold transition ${activeSection === "dropPoint"
                    ? "text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
                    : "text-gray-800 bg-gray-100 hover:bg-gray-200"
                    }`}
                >
                  Choose a Drop Point
                </Button>
              </div>

              {activeSection === "appointment" && (
                <div className="mt-6 space-y-6">
                  {/* Section Title */}
                  <div>
                    <PageHeader className="text-lg font-semibold text-gray-800">
                      Appointment Details
                    </PageHeader>
                    <p className="text-sm text-gray-500 mt-1">
                      Please provide your return address and preferred schedule.
                    </p>
                  </div>

                  {/* Return Address */}
                  <div>
                    <Label className="text-sm font-medium text-gray-600 mb-2 block">
                      Return Address
                    </Label>
                    <Card className="border border-gray-200 shadow-sm rounded-lg">
                      <CardBody className="space-y-6">
                        {/* Address Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col">
                            <Label htmlFor="street_number" className="text-sm font-medium text-gray-700">
                              Street Number
                            </Label>
                            <Input type="text" id="street_number" placeholder="Enter street number" className="mt-1" />
                          </div>

                          <div className="flex flex-col">
                            <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                              City
                            </Label>
                            <Input type="text" id="city" placeholder="Enter city" className="mt-1" />
                          </div>

                          <div className="flex flex-col">
                            <Label htmlFor="country" className="text-sm font-medium text-gray-700">
                              Country
                            </Label>
                            <Input type="text" id="country" placeholder="Enter country" className="mt-1" />
                          </div>

                          <div className="flex flex-col">
                            <Label htmlFor="postal_code" className="text-sm font-medium text-gray-700">
                              Postal Code
                            </Label>
                            <Input type="text" id="postal_code" placeholder="Enter postal code" className="mt-1" />
                          </div>
                        </div>

                        {/* Date & Time */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col">
                            <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                              Date
                            </Label>
                            <Input type="date" id="date" className="mt-1" />
                          </div>

                          <div className="flex flex-col">
                            <Label htmlFor="time" className="text-sm font-medium text-gray-700">
                              Time
                            </Label>
                            <Input type="time" id="time" className="mt-1" />
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              )}


              {/* Drop Point Section */}
              {activeSection === "dropPoint" && (
                <div className="mt-6">
                  <Label className="text-sm font-medium text-gray-600 mb-2 block">Drop Point</Label>

                  <Card className="mt-2 border border-gray-200 shadow-sm">
                    <CardBody className="space-y-1">
                      <Label htmlFor="drop_point" className="text-sm font-medium text-gray-700">
                        Please select a drop point.
                      </Label>
                      <Input type="text" id="drop_point" placeholder="Enter drop point" />
                    </CardBody>
                  </Card>
                </div>
              )}

              {/* Extra Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <Label htmlFor="voucher" className="text-sm font-medium text-gray-700">
                    Voucher Code (Optional)
                  </Label>
                  <Input type="text" id="voucher" placeholder="Enter voucher code" className="mt-1" />
                </div>

                <div className="flex flex-col">
                  <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Message
                  </Label>
                  <Textarea id="message" placeholder="Add any special instructions..." className="mt-1" />
                </div>
              </div>
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

                <PaymentButton
                  label="Pay Now"
                  endpoint="/tasks/create-payment-intent"
                  paymentDetails={{
                    amount: 50.99,
                    details: 'iPhone 16 | Screen Replacement',
                  }}
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div >
  );
};

export default CheckOutPage;
