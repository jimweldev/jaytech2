import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import ReactSelect from 'react-select';
import { toast } from 'sonner';
import { z } from 'zod';
import useServiceBrandModelStore from '@/05_stores/service/service-brand-model-store';
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

// Zod schema to validate the form input
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
    {
      message: 'Required',
    },
  ),
  has_appointment: z.string().min(1, {
    message: 'Required',
  }),
});

// Component Props
type CreateModelItemDialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  refetch: () => void;
};

const CreateModelItemDialog = ({
  open,
  setOpen,
  refetch,
}: CreateModelItemDialogProps) => {
  const { selectedServiceBrandModel } = useServiceBrandModelStore();
  // Initialize form with Zod resolver and default values
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

  // Track loading state for submit button
  const [isLoadingCreateItem, setIsLoadingCreateItem] = useState(false);

  // Handle form submission
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const newData = {
      ...data,
      service_brand_model_id: selectedServiceBrandModel?.id,
      form_type: data.form_type.value,
    };

    setIsLoadingCreateItem(true);

    // Send POST request and show toast notifications
    toast.promise(mainInstance.post(`/services/brands/models/items`, newData), {
      loading: 'Loading...',
      success: () => {
        form.reset();
        refetch();
        setOpen(false);
        return 'Success!';
      },
      error: error => {
        // Display error message from response or fallback
        return (
          error.response?.data?.message || error.message || 'An error occurred'
        );
      },
      finally: () => {
        setIsLoadingCreateItem(false); // Reset loading state
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent autoFocus={true}>
        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
            {/* Dialog header */}
            <DialogHeader>
              <DialogTitle>Create Model Item</DialogTitle>
            </DialogHeader>

            {/* Dialog body */}
            <DialogBody>
              <div className="grid grid-cols-12 gap-3">
                {/* Label field */}
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

                {/* Warranty field */}
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

                {/* Account Type field */}
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

                {/* Has Appointment field */}
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

            {/* Dialog footer */}
            <DialogFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoadingCreateItem}>
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateModelItemDialog;
