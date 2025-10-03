import { useState } from 'react';
import { FaPenToSquare, FaTrash } from 'react-icons/fa6';
import type { ServiceBookingDropPointTechnician } from '@/04_types/service/service-booking-drop-point-technician';
import useServiceBookingDropPointStore from '@/05_stores/service/service-booking-drop-point';
import useServiceBookingDropPointTechnicianStore from '@/05_stores/service/service-booking-drop-point-technician-store';
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
import { formatName } from '@/lib/user/format-name';
import CreateServiceDialog from './_dialogs/create-drop-point-technician-dialog';
import DeleteServiceDialog from './_dialogs/delete-drop-point-technician-dialog';
import UpdateServiceDialog from './_dialogs/update-drop-point-technician-dialog';

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
  const { selectedServiceBookingDropPoint } = useServiceBookingDropPointStore();
  const { setSelectedServiceBookingDropPointTechnician } =
    useServiceBookingDropPointTechnicianStore();

  // Dialog States
  const [openCreateServiceDialog, setOpenCreateServiceDialog] = useState(false);
  const [openUpdateServiceDialog, setOpenUpdateServiceDialog] = useState(false);
  const [openDeleteServiceDialog, setOpenDeleteServiceDialog] = useState(false);

  // Tanstack query hook for pagination
  const dropPointTechniciansPagination =
    useTanstackPaginateQuery<ServiceBookingDropPointTechnician>({
      endpoint: '/services/drop-points/technicians',
      defaultSort: 'id',
      params: `service_booking_drop_point_id=${selectedServiceBookingDropPoint?.id}`,
    });

  // Define table columns
  const columns: DataTableColumn[] = [
    { label: '#', column: 'id', className: 'w-[80px]' },
    { label: 'Technician' },
    { label: 'Service' },
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
            <DialogTitle>Manage Drop Point Technicians</DialogTitle>
          </DialogHeader>

          <DialogBody>
            {/* Data Table */}
            <DataTable
              pagination={dropPointTechniciansPagination}
              columns={columns}
              actions={actions}
            >
              {/* Render rows only if data is present */}
              {dropPointTechniciansPagination.data?.records
                ? dropPointTechniciansPagination.data.records.map(
                    dropPointTechnician => (
                      <TableRow key={dropPointTechnician.id}>
                        <TableCell>{dropPointTechnician.id}</TableCell>
                        <TableCell>
                          {formatName(
                            dropPointTechnician.technician,
                            'semifull',
                          )}
                        </TableCell>
                        <TableCell>
                          {dropPointTechnician.service?.label}
                        </TableCell>
                        <TableCell>
                          {getDateTimezone(
                            dropPointTechnician.created_at,
                            'date_time',
                          )}
                        </TableCell>
                        <TableCell>
                          <InputGroup size="sm">
                            {/* Update button */}
                            <Tooltip content="Update">
                              <Button
                                variant="info"
                                size="icon-xs"
                                onClick={() => {
                                  setSelectedServiceBookingDropPointTechnician(
                                    dropPointTechnician,
                                  );
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
                                  setSelectedServiceBookingDropPointTechnician(
                                    dropPointTechnician,
                                  );
                                  setOpenDeleteServiceDialog(true);
                                }}
                              >
                                <FaTrash />
                              </Button>
                            </Tooltip>
                          </InputGroup>
                        </TableCell>
                      </TableRow>
                    ),
                  )
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
        refetch={dropPointTechniciansPagination.refetch}
      />
      <UpdateServiceDialog
        open={openUpdateServiceDialog}
        setOpen={setOpenUpdateServiceDialog}
        refetch={dropPointTechniciansPagination.refetch}
      />
      <DeleteServiceDialog
        open={openDeleteServiceDialog}
        setOpen={setOpenDeleteServiceDialog}
        refetch={dropPointTechniciansPagination.refetch}
      />
    </>
  );
};

export default ManageImtesModelDialog;
