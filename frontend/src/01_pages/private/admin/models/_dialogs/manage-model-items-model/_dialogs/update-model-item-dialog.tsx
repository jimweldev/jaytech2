import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import ReactSelect from 'react-select';
import { toast } from 'sonner';
import { z } from 'zod';
import useServiceBrandModelItemStore from '@/05_stores/service/service-brand-model-item-store';
import { mainInstance } from '@/07_instances/main-instance';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { convertToSelectOptions } from '@/lib/react-select/convert-to-select-options';
import { cn } from '@/lib/utils';

// ✅ Zod schema (same as create)
const FormSchema = z.object({
  label: z.string().min(1, { message: 'Required' }),
  price: z
    .string()
    .min(1, { message: 'Required' })
    .refine(val => /^[0-9]+(\.[0-9]+)?$/.test(val), {
      message: 'Must be a valid number',
    }),
  details: z.string(),
  warranty: z.string(),
  form_type: z.object(
    {
      label: z.string(),
      value: z.any(),
    },
    { message: 'Required' },
  ),
  has_appointment: z.string().min(1, {
    message: 'Required',
  }),
});

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
  const { selectedServiceBrandModelItem } = useServiceBrandModelItemStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      label: '',
      price: '',
      details: '',
      warranty: '',
      form_type: {
        label: 'Default Form',
        value: 'Default Form',
      },
      has_appointment: '1',
    },
  });

  const [isLoadingUpdateItem, setIsLoadingUpdateItem] = useState(false);

  // ✅ Populate form with existing data
  useEffect(() => {
    if (selectedServiceBrandModelItem) {
      form.reset({
        label: selectedServiceBrandModelItem.label || '',
        price: String(selectedServiceBrandModelItem.price || ''),
        details: selectedServiceBrandModelItem.details || '',
        warranty: selectedServiceBrandModelItem.warranty || '',
        form_type: {
          label: selectedServiceBrandModelItem.form_type || 'Default Form',
          value: selectedServiceBrandModelItem.form_type || 'Default Form',
        },
        has_appointment: String(selectedServiceBrandModelItem.has_appointment),
      });
    }
  }, [selectedServiceBrandModelItem, form]);

  // ✅ Handle submit (PATCH)
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const newData = {
      ...data,
      form_type: data.form_type.value,
    };

    setIsLoadingUpdateItem(true);

    toast.promise(
      mainInstance.patch(
        `/services/brands/models/items/${selectedServiceBrandModelItem?.id}`,
        newData,
      ),
      {
        loading: 'Updating...',
        success: () => {
          refetch();
          setOpen(false);
          return 'Updated successfully!';
        },
        error: error =>
          error.response?.data?.message || error.message || 'An error occurred',
        finally: () => setIsLoadingUpdateItem(false),
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent autoFocus={true}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
            <DialogHeader>
              <DialogTitle>Update Model Item</DialogTitle>
            </DialogHeader>

            <DialogBody>
              <div className="grid grid-cols-12 gap-3">
                {/* Label */}
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Label</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Price */}
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

                {/* Details */}
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

                {/* Warranty */}
                <FormField
                  control={form.control}
                  name="warranty"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Warranty</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Form Type */}
                <FormField
                  control={form.control}
                  name="form_type"
                  render={({ field, fieldState }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Form Type</FormLabel>
                      <FormControl>
                        <ReactSelect
                          className={cn(
                            'react-select-container',
                            fieldState.invalid ? 'invalid' : '',
                          )}
                          classNamePrefix="react-select"
                          options={convertToSelectOptions([
                            'Default Form',
                            'Car Key Upgrade Form',
                          ])}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Has Appointment */}
                <FormField
                  control={form.control}
                  name="has_appointment"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Has Appointment</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-col gap-1"
                        >
                          <FormItem className="flex items-center gap-2">
                            <FormControl>
                              <RadioGroupItem value="1" />
                            </FormControl>
                            <FormLabel className="mb-0 text-sm font-normal">
                              Yes
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center gap-2">
                            <FormControl>
                              <RadioGroupItem value="0" />
                            </FormControl>
                            <FormLabel className="mb-0 text-sm font-normal">
                              No
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </DialogBody>

            <DialogFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoadingUpdateItem}>
                {isLoadingUpdateItem ? 'Updating...' : 'Submit'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateServiceDialog;
