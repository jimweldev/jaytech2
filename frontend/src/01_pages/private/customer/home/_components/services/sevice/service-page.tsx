import type { ServiceBrand } from "@/04_types/service/service-brand";
import type { ServiceBrandModel } from "@/04_types/service/service-brand-model";
import useServiceBookedItem from "@/05_stores/service/service-booked-items";
import ServiceBrandModelItemSelect from "@/components/react-select/service-brand-model-item-select";
import PageHeader from "@/components/typography/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useTanstackPaginateQuery from "@/hooks/tanstack/use-tanstack-paginate-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router";
import z from "zod";

// Zod schema to validate the form input
const FormSchema = z.object({
    service_item: z.object(
        {
            label: z.string().min(1, {
                message: 'Required',
            }),
            value: z.number().min(1, {
                message: 'Required',
            }),
            price: z.string().min(1, {
                message: 'Required',
            }),
        },
        {
            message: 'Required',
        },
    ),
    price: z.string().min(1, {
        message: 'Required',
    }),
});

type Service = {
    id: number;
    label: string;
    price: string;
};

const ServicePage = () => {
    const navigate = useNavigate();
    const [servicesList, setServicesList] = useState<Service[]>([]);

    const { setBookedServices } = useServiceBookedItem();

    // get parameters from url
    const { brand, model } = useParams();

    // get brand record
    const brandsRecord = useTanstackPaginateQuery<ServiceBrand>({
        endpoint: `/services/brands/${brand}`,
        defaultSort: 'id',
    });

    // get model record
    const modelRecord = useTanstackPaginateQuery<ServiceBrandModel>({
        endpoint: `/services/brands/models/${model}`,
        defaultSort: 'id',
    });

    // Initialize form with Zod resolver and default values
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            service_item: undefined,
            price: '',
        },
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        const newService = {
            id: data.service_item?.value,
            label: data.service_item?.label,
            price: data.price,
        };

        setServicesList((prev: Service[]) => {
            // Prevent duplicates (based on id)
            if (prev.some((item) => item.id === newService.id)) {
                return prev; // do nothing if exists
            }
            return [...prev, newService];
        });

        form.reset({
            service_item: { label: "", value: undefined, price: "" },
            price: "",
        });
    };


    const bookNow = () => {
        setBookedServices(servicesList);
    }

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                {/* LEFT COLUMN: Booking Details */}
                <div className="md:col-span-2 order-2 md:order-1 space-y-4">
                    <Card className="shadow-sm">
                        <CardBody className="space-y-4">
                            <PageHeader className="my-2 text-lg">Service Description</PageHeader>
                            <p className="text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

                            <PageHeader className="my-2 text-lg">Booked Services</PageHeader>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                                        {/* Service Select */}
                                        <div>
                                            <FormField
                                                control={form.control}
                                                name="service_item"
                                                render={({ field, fieldState }) => (
                                                    <FormItem>
                                                        <FormLabel>Service Name</FormLabel>
                                                        <FormControl>
                                                            <ServiceBrandModelItemSelect
                                                                serviceBrandCategoryId={modelRecord.data?.id}
                                                                className={`${fieldState.invalid ? "invalid" : ""}`}
                                                                value={field.value}
                                                                // when user selects an option
                                                                onChange={(val: any) => {
                                                                    field.onChange(val); // update service_item
                                                                    if (val?.price) {
                                                                        form.setValue("price", val.price); // update price field
                                                                    } else {
                                                                        form.setValue("price", ""); // clear if no price
                                                                    }
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        {/* Price Input (auto filled) */}
                                        <div className="flex flex-col gap-2">
                                            <FormField
                                                control={form.control}
                                                name="price"
                                                render={({ field, fieldState }) => (
                                                    <FormItem>
                                                        <FormLabel>Price</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                readOnly
                                                                className={`${fieldState.invalid ? "invalid" : ""}`}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <div className="flex items-center justify-center">
                                            <Button type="submit" variant="default" className="w-full">
                                                Add Service
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </Form>


                            {/* table list */}
                            {servicesList.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left border-collapse">
                                        <thead>
                                            <tr className="bg-gray-100 text-gray-700">
                                                <th className="px-4 py-2 border">Service Name</th>
                                                <th className="px-4 py-2 border">Price</th>
                                                <th className="px-4 py-2 border text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {servicesList.map((service) => (
                                                <tr key={service.id} className="hover:bg-gray-50">
                                                    <td className="px-4 py-2 border">{service.label}</td>
                                                    <td className="px-4 py-2 border">€{service.price}</td>
                                                    <td className="px-4 py-2 border text-center">
                                                        <Button
                                                            onClick={() =>
                                                                setServicesList((prev) =>
                                                                    prev.filter((item) => item.id !== service.id)
                                                                )
                                                            }
                                                            variant="destructive"
                                                            size="icon-sm"
                                                        >
                                                            <FaTimes />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>

                                        {/* Total Row */}
                                        <tfoot>
                                            <tr className="bg-gray-100 font-semibold">
                                                <td className="px-4 py-2 border text-right">Total:</td>
                                                <td className="px-4 py-2 border">
                                                    €
                                                    {servicesList
                                                        .reduce(
                                                            (sum, item) => sum + parseFloat(item.price || "0"),
                                                            0
                                                        )
                                                        .toFixed(2)}
                                                </td>
                                                <td className="px-4 py-2 border"></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm">No services added yet.</p>
                            )}

                        </CardBody>
                    </Card>

                </div>

                {/* RIGHT COLUMN: Summary + Image */}
                <div className="md:col-span-1 order-1 md:order-2">
                    <Card className="h-full shadow-sm">
                        <div className="bg-gray-100 flex justify-center p-4">
                            <img
                                src={modelRecord.data?.thumbnail_path || "https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-network-placeholder-png-image_3416659.jpg"} // fallback if no image
                                alt={modelRecord.data?.label}
                                className="w-full max-w-xs rounded-lg object-cover"
                            />
                        </div>

                        <CardBody className="space-y-4 text-gray-700">
                            <div className="flex items-center justify-between w-full">
                                <Label htmlFor="brand" className="text-sm font-medium text-gray-600">Brand</Label>
                                <p className="text-base font-semibold text-gray-800">{brandsRecord.data?.label}</p>
                            </div>

                            <div className="flex items-center justify-between w-full">
                                <Label htmlFor="model" className="text-sm font-medium text-gray-600">Model</Label>
                                <p className="text-base font-semibold text-gray-800">{modelRecord.data?.label}</p>
                            </div>

                            <div className="flex justify-end gap-2 mt-4">
                                <Button variant="outline" >Add to Cart</Button>

                                <Link to="/cart/checkout">
                                    <Button variant="default" onClick={bookNow}>
                                        Book Now
                                    </Button>
                                </Link>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div >
    )
}

export default ServicePage