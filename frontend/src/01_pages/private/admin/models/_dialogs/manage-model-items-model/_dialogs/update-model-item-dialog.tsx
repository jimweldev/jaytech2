import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import useServiceBrandModelItemStore from '@/05_stores/service/service-brand-model-item-store';
import useServiceBrandModelStore from '@/05_stores/service/service-brand-model-store';
import { mainInstance } from '@/07_instances/main-instance';
import ServiceItemSelect from '@/components/react-select/service-item-select';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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
    },
    {
      message: 'Required',
    },
  ),
  price: z
    .string()
    .min(1, { message: 'Required' })
    .refine(val => /^[0-9]+(\.[0-9]+)?$/.test(val), {
      message: 'Must be a valid number',
    }),
  details: z.string(),
});

// Component Props
type UpdateServiceDialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  refetch: () => void;
};

const UpdateServiceDialog = ({
  open,
  setOpen,
  refetch,
}: UpdateServiceDialogProps) => {
  // Access store values
  const { selectedServiceBrandModel } = useServiceBrandModelStore();
  const { selectedServiceBrandModelItem } = useServiceBrandModelItemStore();

  // Initialize form with Zod resolver and default values
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      service_item: undefined,
      price: '',
      details: '',
    },
  });

  // Populate form with selected items's data
  useEffect(() => {
    if (selectedServiceBrandModelItem) {
      form.reset({
        service_item: selectedServiceBrandModelItem.service_item
          ? {
              label: selectedServiceBrandModelItem.service_item.label,
              value: selectedServiceBrandModelItem.service_item.id,
            }
          : undefined,
        price: String(selectedServiceBrandModelItem.price),
        details: selectedServiceBrandModelItem.details || '',
      });
    }
  }, [selectedServiceBrandModelItem, form]);

  // Track loading state for submit button
  const [isLoadingUpdateItem, setIsLoadingUpdateItem] =
    useState<boolean>(false);

  // Handle form submission
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const newData = {
      ...data,
      service_item_id: data.service_item.value,
    };

    setIsLoadingUpdateItem(true);

    // Send PATCH request and show toast notifications
    toast.promise(
      mainInstance.patch(
        `/services/brands/models/items/${selectedServiceBrandModelItem?.id}`,
        newData,
      ),
      {
        loading: 'Loading...',
        success: () => {
          refetch();
          setOpen(false);
          return 'Success!';
        },
        error: error => {
          // Display error message from response or fallback
          return (
            error.response?.data?.message ||
            error.message ||
            'An error occurred'
          );
        },
        finally: () => {
          setIsLoadingUpdateItem(false); // Reset loading state
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
            {/* Dialog header */}
            <DialogHeader>
              <DialogTitle>Update Model Item</DialogTitle>
            </DialogHeader>

            {/* Dialog body */}
            <DialogBody>
              <div className="grid grid-cols-12 gap-3">
                <FormField
                  control={form.control}
                  name="service_item"
                  render={({ field, fieldState }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Service item</FormLabel>
                      <FormControl>
                        <ServiceItemSelect
                          serviceBrandCategoryId={
                            selectedServiceBrandModel?.service_brand_category_id
                          }
                          className={`${fieldState.invalid ? 'invalid' : ''}`}
                          placeholder="Select service item"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Name field */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Details field */}
                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Details</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </DialogBody>

            {/* Dialog footer */}
            <DialogFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoadingUpdateItem}>
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateServiceDialog;
