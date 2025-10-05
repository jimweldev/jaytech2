import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import useServiceBookingDropPointStore from '@/05_stores/service/service-booking-drop-point-store';
import { mainInstance } from '@/07_instances/main-instance';
import ServiceSelect from '@/components/react-select/service-select';
import TechnicianSelect from '@/components/react-select/technician-select';
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

// Zod schema to validate the form input
const FormSchema = z.object({
  technician: z.object(
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
  service: z.object(
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
});

// Component Props
type CreateServiceDialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  refetch: () => void;
};

const CreateServiceDialog = ({
  open,
  setOpen,
  refetch,
}: CreateServiceDialogProps) => {
  // Initialize form with Zod resolver and default values
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      technician: undefined,
      service: undefined,
    },
  });

  const { selectedServiceBookingDropPoint } = useServiceBookingDropPointStore();

  // Track loading state for submit button
  const [isLoadingCreateItem, setIsLoadingCreateItem] = useState(false);

  // Handle form submission
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const newData = {
      service_booking_drop_point_id: selectedServiceBookingDropPoint?.id,
      technician_id: data.technician.value,
      service_id: data.service.value,
    };
    setIsLoadingCreateItem(true);

    // Send POST request and show toast notifications
    toast.promise(
      mainInstance.post(`/services/drop-points/technicians`, newData),
      {
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
            error.response?.data?.message ||
            error.message ||
            'An error occurred'
          );
        },
        finally: () => {
          setIsLoadingCreateItem(false); // Reset loading state
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent autoFocus={true}>
        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
            {/* Dialog header */}
            <DialogHeader>
              <DialogTitle>Create Drop Point Technician</DialogTitle>
            </DialogHeader>

            {/* Dialog body */}
            <DialogBody>
              <div className="grid grid-cols-12 gap-3">
                <FormField
                  control={form.control}
                  name="technician"
                  render={({ field, fieldState }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Technician</FormLabel>
                      <FormControl>
                        <TechnicianSelect
                          className={`${fieldState.invalid ? 'invalid' : ''}`}
                          placeholder="Select technician"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="service"
                  render={({ field, fieldState }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Service</FormLabel>
                      <FormControl>
                        <ServiceSelect
                          className={`${fieldState.invalid ? 'invalid' : ''}`}
                          placeholder="Select service"
                          value={field.value}
                          onChange={field.onChange}
                        />
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

export default CreateServiceDialog;
