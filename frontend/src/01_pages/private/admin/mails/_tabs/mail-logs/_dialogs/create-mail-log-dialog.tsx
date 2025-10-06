import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { mainInstance } from '@/07_instances/main-instance';
import FileDropzone from '@/components/dropzone/file-dropzone';
import MailTemplateSelect from '@/components/react-select/mail-template-select';
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
import { handleRejectedFiles } from '@/lib/react-dropzone/handle-rejected-files';
import { mergeUniqueFiles } from '@/lib/react-dropzone/merge-unique-files';

// Zod schema to validate the form input
const FormSchema = z.object({
  mail_template: z.object(
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
  subject: z.string().min(1, { message: 'Required' }),
  content_data: z.string().refine(
    data => {
      try {
        JSON.parse(data);
        return true;
      } catch {
        return false;
      }
    },
    { message: 'Invalid JSON' },
  ),
  attachments: z.array(
    z.file().refine(
      file => {
        // Check if file has a name
        if (!file.name || file.name.trim() === '') {
          return false;
        }

        const nameWithoutExt = file.name.split('.').slice(0, -1).join('.');

        // Check if file filename and not extension only
        if (nameWithoutExt === '') {
          return false;
        }

        return true;
      },
      {
        message: 'Invalid filename',
      },
    ),
  ),
});

// Component Props
type CreateMailLogDialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  refetch: () => void;
};

const CreateMailLogDialog = ({
  open,
  setOpen,
  refetch,
}: CreateMailLogDialogProps) => {
  // Initialize form with Zod resolver and default values
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      mail_template: undefined,
      subject: '',
      content_data: '',
      attachments: [],
    },
  });

  // Track loading state for submit button
  const [isLoadingCreateItem, setIsLoadingCreateItem] = useState(false);

  // Handle form submission
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    // Create a new FormData object to handle file uploads
    const formData = new FormData();

    formData.append('mail_template_id', data.mail_template.value.toString());
    formData.append('subject', data.subject);
    formData.append('content_data', data.content_data);

    // Add files as attachments
    data.attachments.forEach((file, index) => {
      formData.append(`attachments[${index}]`, file);
    });

    setIsLoadingCreateItem(true);

    // Send POST request and show toast notifications
    toast.promise(mainInstance.post(`/mails/logs`, formData), {
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
      <DialogContent size="5xl" autoFocus={true}>
        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
            {/* Dialog header */}
            <DialogHeader>
              <DialogTitle>Create Mail Log</DialogTitle>
            </DialogHeader>

            {/* Dialog body */}
            <DialogBody>
              <div className="gap-layout grid grid-cols-12 items-start">
                <div className="gap-layout col-span-6 grid grid-cols-12">
                  {/* Mail template ID field */}
                  <FormField
                    control={form.control}
                    name="mail_template"
                    render={({ field, fieldState }) => (
                      <FormItem className="col-span-12">
                        <FormLabel>Mail Template</FormLabel>
                        <FormControl>
                          <MailTemplateSelect
                            className={`${fieldState.invalid ? 'invalid' : ''}`}
                            placeholder="Select mail template"
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Content data field */}
                  <FormField
                    control={form.control}
                    name="content_data"
                    render={({ field }) => (
                      <FormItem className="col-span-12">
                        <FormLabel>Content Data</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder={`{\n  "message": "Lorem ipsum dolor sit amet"\n}`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="gap-layout col-span-6 grid grid-cols-12">
                  {/* Subject field */}
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem className="col-span-12">
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="JayTech Voucher Code"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Attachments field */}
                  <FormField
                    control={form.control}
                    name="attachments"
                    render={({ field, fieldState }) => {
                      return (
                        <FormItem className="col-span-12">
                          <FormLabel>Attachments</FormLabel>
                          <FormControl>
                            <FileDropzone
                              isInvalid={fieldState.invalid}
                              setFiles={field.onChange}
                              files={field.value}
                              onDrop={(acceptedFiles, rejectedFiles) => {
                                const mergedFiles = mergeUniqueFiles(
                                  field.value,
                                  acceptedFiles,
                                );
                                field.onChange(mergedFiles);
                                handleRejectedFiles(rejectedFiles);
                              }}
                              onRemove={(fileToRemove: File) => {
                                field.onChange(
                                  field.value.filter(
                                    file => file !== fileToRemove,
                                  ),
                                );
                              }}
                              isMultiple
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
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

export default CreateMailLogDialog;
