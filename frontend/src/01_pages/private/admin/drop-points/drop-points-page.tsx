import { useState } from 'react';
import { FaPenToSquare, FaTrash } from 'react-icons/fa6';
import type { ServiceBookingDropPoint } from '@/04_types/service/service-booking-drop-point';
import useServiceBookingDropPointStore from '@/05_stores/service/service-booking-drop-point';
import DataTable, {
  type DataTableColumn,
} from '@/components/data-table/data-table';
import InputGroup from '@/components/input-group/input-group';
import Tooltip from '@/components/tooltip/tooltip';
import PageHeader from '@/components/typography/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardBody } from '@/components/ui/card';
import { TableCell, TableRow } from '@/components/ui/table';
import useTanstackPaginateQuery from '@/hooks/tanstack/use-tanstack-paginate-query';
import { getDateTimezone } from '@/lib/date/get-date-timezone';
import CreateDropPointDialog from './_dialogs/create-drop-point-dialog';
import DeleteDropPointDialog from './_dialogs/delete-drop-point-dialog';
import ManageDropPointTechnicianDialog from './_dialogs/manage-drop-point-technician/manage-drop-point-technician-dialog';
import UpdateDropPointDialog from './_dialogs/update-drop-point-dialog';

const DropPointsPage = () => {
  // Store
  const { setSelectedServiceBookingDropPoint } =
    useServiceBookingDropPointStore();

  // Dialog States
  const [openCreateDropPointDialog, setOpenCreateDropPointDialog] =
    useState(false);
  const [openUpdateDropPointDialog, setOpenUpdateDropPointDialog] =
    useState(false);
  const [
    openManageDropPointTechniciansDialog,
    setOpenManageDropPointTechniciansDialog,
  ] = useState(false);
  const [openDeleteDropPointDialog, setOpenDeleteDropPointDialog] =
    useState(false);

  // Tanstack query hook for pagination
  const serviceBookingDropPointsPagination =
    useTanstackPaginateQuery<ServiceBookingDropPoint>({
      endpoint: '/services/drop-points',
      defaultSort: 'id',
    });

  // Define table columns
  const columns: DataTableColumn[] = [
    { label: '#', column: 'id', className: 'w-[80px]' },
    { label: 'Location', column: 'location' },
    { label: 'Coordinates', column: 'coordinates' },
    { label: 'Created At', column: 'created_at', className: 'w-[200px]' },
    { label: 'Actions', className: 'w-[100px]' },
  ];

  // Actions buttons
  const actions = (
    <Button
      size="sm"
      onClick={() => {
        setOpenCreateDropPointDialog(true);
      }}
    >
      Create
    </Button>
  );

  return (
    <>
      <PageHeader className="mb-3">Drop Points</PageHeader>

      {/* Card */}
      <Card>
        <CardBody>
          {/* Data Table */}
          <DataTable
            pagination={serviceBookingDropPointsPagination}
            columns={columns}
            actions={actions}
          >
            {/* Render rows only if data is present */}
            {serviceBookingDropPointsPagination.data?.records
              ? serviceBookingDropPointsPagination.data.records.map(
                  dropPoint => (
                    <TableRow key={dropPoint.id}>
                      <TableCell>{dropPoint.id}</TableCell>
                      <TableCell>{dropPoint.location}</TableCell>
                      <TableCell>{dropPoint.coordinates}</TableCell>
                      <TableCell>
                        {getDateTimezone(dropPoint.created_at, 'date_time')}
                      </TableCell>
                      <TableCell>
                        <InputGroup size="sm">
                          {/* Update button */}
                          <Tooltip content="Update">
                            <Button
                              variant="info"
                              size="icon-xs"
                              onClick={() => {
                                setSelectedServiceBookingDropPoint(dropPoint);
                                setOpenUpdateDropPointDialog(true);
                              }}
                            >
                              <FaPenToSquare />
                            </Button>
                          </Tooltip>

                          {/* Manage technicians */}
                          <Tooltip content="Update">
                            <Button
                              variant="warning"
                              size="icon-xs"
                              onClick={() => {
                                setSelectedServiceBookingDropPoint(dropPoint);
                                setOpenManageDropPointTechniciansDialog(true);
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
                                setSelectedServiceBookingDropPoint(dropPoint);
                                setOpenDeleteDropPointDialog(true);
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
        </CardBody>
      </Card>

      {/* Dialogs */}
      <CreateDropPointDialog
        open={openCreateDropPointDialog}
        setOpen={setOpenCreateDropPointDialog}
        refetch={serviceBookingDropPointsPagination.refetch}
      />
      <UpdateDropPointDialog
        open={openUpdateDropPointDialog}
        setOpen={setOpenUpdateDropPointDialog}
        refetch={serviceBookingDropPointsPagination.refetch}
      />
      <ManageDropPointTechnicianDialog
        open={openManageDropPointTechniciansDialog}
        setOpen={setOpenManageDropPointTechniciansDialog}
      />
      <DeleteDropPointDialog
        open={openDeleteDropPointDialog}
        setOpen={setOpenDeleteDropPointDialog}
        refetch={serviceBookingDropPointsPagination.refetch}
      />
    </>
  );
};

export default DropPointsPage;
