import { useState } from 'react';
import { FaPenToSquare, FaTrash } from 'react-icons/fa6';
import type { ServiceBrandModelItem } from '@/04_types/service/service-brand-model-item';
import useServiceBrandModelItemStore from '@/05_stores/service/service-brand-model-item-store';
import useServiceBrandModelStore from '@/05_stores/service/service-brand-model-store';
import DataTable, {
  type DataTableColumn,
} from '@/components/data-table/data-table';
import InputGroup from '@/components/input-group/input-group';
import Tooltip from '@/components/tooltip/tooltip';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TableCell, TableRow } from '@/components/ui/table';
import useTanstackPaginateQuery from '@/hooks/tanstack/use-tanstack-paginate-query';
import { getDateTimezone } from '@/lib/date/get-date-timezone';
import { formatNumber } from '@/lib/number/format-number';
import CreateServiceDialog from './_dialogs/create-model-item-dialog';
import DeleteServiceDialog from './_dialogs/delete-model-item-dialog';
import UpdateServiceDialog from './_dialogs/update-model-item-dialog';

// Component Props
type ManageImtesModelDialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const ManageImtesModelDialog = ({
  open,
  setOpen,
}: ManageImtesModelDialogProps) => {
  // Store
  const { selectedServiceBrandModel } = useServiceBrandModelStore();
  const { setSelectedServiceBrandModelItem } = useServiceBrandModelItemStore();

  // Dialog States
  const [openCreateServiceDialog, setOpenCreateServiceDialog] = useState(false);
  const [openUpdateServiceDialog, setOpenUpdateServiceDialog] = useState(false);
  const [openDeleteServiceDialog, setOpenDeleteServiceDialog] = useState(false);

  // Tanstack query hook for pagination
  const modelItemsPagination = useTanstackPaginateQuery<ServiceBrandModelItem>({
    endpoint: '/services/brands/models/items',
    defaultSort: 'id',
    params: `service_brand_model_id=${selectedServiceBrandModel?.id}`,
  });

  // Define table columns
  const columns: DataTableColumn[] = [
    { label: '#', column: 'id', className: 'w-[80px]' },
    { label: 'Brand' },
    { label: 'Service' },
    { label: 'Item' },
    { label: 'Price', column: 'price' },
    { label: 'Created At', column: 'created_at', className: 'w-[200px]' },
    { label: 'Actions', className: 'w-[100px]' },
  ];

  // Actions buttons
  const actions = (
    <Button
      size="sm"
      onClick={() => {
        setOpenCreateServiceDialog(true);
      }}
    >
      Create
    </Button>
  );

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent size="5xl" autoFocus={true}>
          <DialogHeader>
            <DialogTitle>Manage Model</DialogTitle>
          </DialogHeader>

          <DialogBody>
            {/* Data Table */}
            <DataTable
              pagination={modelItemsPagination}
              columns={columns}
              actions={actions}
            >
              {/* Render rows only if data is present */}
              {modelItemsPagination.data?.records
                ? modelItemsPagination.data.records.map(modelItem => (
                    <TableRow key={modelItem.id}>
                      <TableCell>{modelItem.id}</TableCell>
                      <TableCell>
                        {
                          modelItem.service_brand_model?.service_brand_category
                            ?.service_brand?.label
                        }
                      </TableCell>
                      <TableCell>
                        {
                          modelItem.service_brand_model?.service_brand_category
                            ?.service?.label
                        }
                      </TableCell>
                      <TableCell>{modelItem.service_item?.label}</TableCell>
                      <TableCell>€{formatNumber(modelItem.price, 2)}</TableCell>
                      <TableCell>
                        {getDateTimezone(modelItem.created_at, 'date_time')}
                      </TableCell>
                      <TableCell>
                        <InputGroup size="sm">
                          {/* Update button */}
                          <Tooltip content="Update">
                            <Button
                              variant="info"
                              size="icon-xs"
                              onClick={() => {
                                setSelectedServiceBrandModelItem(modelItem);
                                setOpenUpdateServiceDialog(true);
                              }}
                            >
                              <FaPenToSquare />
                            </Button>
                          </Tooltip>

                          {/* Delete button */}
                          <Tooltip content="Delete">
                            <Button
                              variant="destructive"
                              size="icon-xs"
                              onClick={() => {
                                setSelectedServiceBrandModelItem(modelItem);
                                setOpenDeleteServiceDialog(true);
                              }}
                            >
                              <FaTrash />
                            </Button>
                          </Tooltip>
                        </InputGroup>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </DataTable>
          </DialogBody>

          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogs */}
      <CreateServiceDialog
        open={openCreateServiceDialog}
        setOpen={setOpenCreateServiceDialog}
        refetch={modelItemsPagination.refetch}
      />
      <UpdateServiceDialog
        open={openUpdateServiceDialog}
        setOpen={setOpenUpdateServiceDialog}
        refetch={modelItemsPagination.refetch}
      />
      <DeleteServiceDialog
        open={openDeleteServiceDialog}
        setOpen={setOpenDeleteServiceDialog}
        refetch={modelItemsPagination.refetch}
      />
    </>
  );
};

export default ManageImtesModelDialog;
