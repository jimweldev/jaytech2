import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AttributesTab from './_tabs/attributes/attributes-tab';
import CombinationTab from './_tabs/combinations/combinations-tab';
import ValuesTab from './_tabs/values/values-tab';

// Component Props
type ManageServiceProductVariantDialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  refetch: () => void;
};

const ManageServiceProductVariantDialog = ({
  open,
  setOpen,
  refetch,
}: ManageServiceProductVariantDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tabs defaultValue="account">
        <DialogContent size="7xl" autoFocus={true}>
          {/* Dialog header */}
          <DialogHeader>
            <DialogTitle>Create ServiceProductVariant</DialogTitle>
          </DialogHeader>

          <TabsList variant="outline">
            <TabsTrigger value="combinations">Combinations</TabsTrigger>
            <TabsTrigger value="values">Values</TabsTrigger>
            <TabsTrigger value="attributes">Attributes</TabsTrigger>
          </TabsList>

          {/* Dialog body */}
          <DialogBody>
            <TabsContent value="combinations">
              <CombinationTab />
            </TabsContent>
            <TabsContent value="values">
              <ValuesTab />
            </TabsContent>
            <TabsContent value="attributes">
              <AttributesTab />
            </TabsContent>
          </DialogBody>

          {/* Dialog footer */}
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Tabs>
    </Dialog>
  );
};

export default ManageServiceProductVariantDialog;
