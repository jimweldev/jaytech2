import { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import CreatableSelect from 'react-select/creatable';
import { toast } from 'sonner';
import { z } from 'zod';
import useServiceItemStore from '@/05_stores/service/service-item-store';
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
import { resizeImage } from '@/lib/image/resize-image';

// Zod schema
const FormSchema = z.object({
  label: z.string().min(1, {
    message: 'Required',
  }),
  categories: z.any().optional(), // <-- added
});

type UpdateItemDialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  refetch: () => void;
};

const UpdateItemDialog = ({
  open,
  setOpen,
  refetch,
}: UpdateItemDialogProps) => {
  const { selectedServiceItem } = useServiceItemStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      label: '',
      categories: [],
    },
  });

  useEffect(() => {
    if (selectedServiceItem) {
      form.reset({
        label: selectedServiceItem.label || '',
        categories: selectedServiceItem.categories
          ? selectedServiceItem.categories.map((cat: any) => cat.label) // <-- map to string
          : [],
      });

      if (selectedServiceItem.thumbnail_path) {
        setCroppedImage(null);
      }
    }
  }, [selectedServiceItem, form]);

  const [isLoadingUpdateItem, setIsLoadingUpdateItem] = useState(false);

  // --- image states ---
  const fileImageRef = useRef<HTMLInputElement>(null);
  const [imageSource, setImageSource] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && !file.type.match('image/jpeg|image/png')) {
      toast.error('Only jpg and png images are allowed');
      return;
    }
    if (file) {
      setImageSource(URL.createObjectURL(file));
    }
  };

  const onRemoveImage = () => {
    setImageSource(null);
    setCroppedImage(null);
    if (fileImageRef.current) {
      fileImageRef.current.value = '';
    }
  };

  // --- submit ---
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoadingUpdateItem(true);

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

    // Append categories
    if (data.categories && data.categories.length > 0) {
      data.categories.forEach((cat: string, index: number) => {
        formData.append(`categories[${index}]`, cat);
      });
    }

    toast.promise(
      mainInstance.post(
        `/services/items/${selectedServiceItem?.id}?_method=PATCH`,
        formData,
      ),
      {
        loading: 'Updating...',
        success: () => {
          refetch();
          setOpen(false);
          setImageSource(null);
          setCroppedImage(null);
          return 'Updated successfully!';
        },
        error: error => {
          return (
            error.response?.data?.message ||
            error.message ||
            'An error occurred'
          );
        },
        finally: () => {
          setIsLoadingUpdateItem(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
            <DialogHeader>
              <DialogTitle>Update Item</DialogTitle>
            </DialogHeader>

            <DialogBody>
              <div className="grid grid-cols-12 gap-3">
                {/* Thumbnail */}
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

                {/* Categories (React Select Creatable) */}
                <FormField
                  control={form.control}
                  name="categories"
                  render={({ field, fieldState }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Categories</FormLabel>
                      <FormControl>
                        <CreatableSelect
                          className={`react-select-container ${fieldState.invalid ? 'invalid' : ''}`}
                          classNamePrefix="react-select"
                          placeholder="Type and press enter to add category"
                          isMulti
                          value={field.value?.map((v: string) => ({
                            label: v,
                            value: v,
                          }))} // <-- now always string[] → options
                          onChange={selected =>
                            field.onChange(selected?.map(s => s.value) || [])
                          }
                        />
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
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateItemDialog;
