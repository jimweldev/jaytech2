import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import useServiceProductVariantValueStore from '@/05_stores/service/service-product-variant-value-store';
import { mainInstance } from '@/07_instances/main-instance';
import AttributeSelect from '@/components/react-select/attribute-select';
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
import { cn } from '@/lib/utils';

// Zod schema to validate the form input
const FormSchema = z.object({
  service_product_variant_attribute: z.object({
    label: z.string(),
    value: z.any(),
  }),
  value: z.string().min(1, {
    message: 'Required',
  }),
  display_order: z.string().min(1, {
    message: 'Required',
  }),
});

// Component Props
type UpdateServiceProductVariantValueDialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  refetch: () => void;
};

const UpdateServiceProductVariantValueDialog = ({
  open,
  setOpen,
  refetch,
}: UpdateServiceProductVariantValueDialogProps) => {
  // Access store values
  const { selectedServiceProductVariantValue } =
    useServiceProductVariantValueStore();

  // Initialize form with Zod resolver and default values
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      service_product_variant_attribute: undefined,
      value: '',
      display_order: '',
    },
  });

  // Populate form with selected items's data
  useEffect(() => {
    if (selectedServiceProductVariantValue) {
      form.reset({
        service_product_variant_attribute:
          selectedServiceProductVariantValue.service_product_variant_attribute ||
          undefined,
        value: selectedServiceProductVariantValue.value || '',
        display_order:
          String(selectedServiceProductVariantValue.display_order) || '',
      });
    }
  }, [selectedServiceProductVariantValue, form]);

  // Track loading state for submit button
  const [isLoadingUpdateItem, setIsLoadingUpdateItem] =
    useState<boolean>(false);

  // Handle form submission
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const newData = {
      ...data,
      service_product_variant_attribute_id:
        data.service_product_variant_attribute.value,
    };
    setIsLoadingUpdateItem(true);

    // Send PATCH request and show toast notifications
    toast.promise(
      mainInstance.patch(
        `/services/products/variants/values/${selectedServiceProductVariantValue?.id}`,
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
              <DialogTitle>Update ServiceProductVariantValue</DialogTitle>
            </DialogHeader>

            {/* Dialog body */}
            <DialogBody>
              <div className="grid grid-cols-12 gap-3">
                {/* Attribute field */}
                <FormField
                  control={form.control}
                  name="service_product_variant_attribute"
                  render={({ field, fieldState }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Service</FormLabel>
                      <FormControl>
                        <AttributeSelect
                          className={cn(
                            'react-select-container',
                            fieldState.invalid ? 'invalid' : '',
                          )}
                          classNamePrefix="react-select"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Label field */}
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Value</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Display Order field */}
                <FormField
                  control={form.control}
                  name="display_order"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Display Order</FormLabel>
                      <FormControl>
                        <Input {...field} />
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

export default UpdateServiceProductVariantValueDialog;
