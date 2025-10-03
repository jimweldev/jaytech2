import { useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'sonner';
import { z } from 'zod';
import { mainInstance } from '@/07_instances/main-instance';
import ImageCropper from '@/components/image/image-cropper';
import InputGroup from '@/components/input-group/input-group';
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
import { resizeImage } from '@/lib/image/resize-image';

// Zod schema to validate the form input
const FormSchema = z.object({
  label: z.string().min(1, {
    message: 'Required',
  }),
  description: z.string(),
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
      label: '',
      description: '',
    },
  });

  const [isLoadingCreateItem, setIsLoadingCreateItem] = useState(false);
  const fileImageRef = useRef<HTMLInputElement>(null);

  const [imageSource, setImageSource] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && !file.type.match('image/jpeg|image/png')) {
      toast.error('Only jpg and png images are allowed');
      return;
    }
    if (file) setImageSource(URL.createObjectURL(file));
  };

  const onRemoveImage = () => {
    setImageSource(null);
    setCroppedImage(null);
    if (fileImageRef.current) fileImageRef.current.value = '';
  };

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoadingCreateItem(true);

    const formData = new FormData();

    if (croppedImage) {
      const resizedImage = await resizeImage(croppedImage, 128, 128);

      const byteString = atob(resizedImage.split(',')[1]);
      const mimeString = resizedImage.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([ab], { type: mimeString });
      const file = new File([blob], 'thumbnail.png', { type: mimeString });

      formData.append('thumbnail', file);
    }

    formData.append('label', data.label);
    formData.append('description', data.description);

    // Send POST request and show toast notifications
    toast.promise(mainInstance.post(`/services`, formData), {
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
              <DialogTitle>Create Service</DialogTitle>
            </DialogHeader>

            {/* Dialog body */}
            <DialogBody>
              <div className="grid grid-cols-12 gap-3">
                <div className="space-y-layout col-span-12">
                  <ImageCropper
                    imageSource={imageSource}
                    onCropComplete={setCroppedImage}
                    aspectRatio={1 / 1}
                  />

                  <InputGroup>
                    <Input
                      ref={fileImageRef}
                      id="image-cropper"
                      type="file"
                      accept=".jpg, .png"
                      inputSize="sm"
                      onChange={onFileChange}
                    />
                    <Button
                      variant="destructive"
                      size="icon-sm"
                      onClick={onRemoveImage}
                    >
                      <FaTimes />
                    </Button>
                  </InputGroup>
                </div>

                {/* Name field */}
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

                {/* Description field */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Description</FormLabel>
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
