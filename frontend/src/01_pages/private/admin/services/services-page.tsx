import { useState } from 'react';
import { FaPenToSquare, FaTrash } from 'react-icons/fa6';
import type { Service } from '@/04_types/service/service';
import useServiceStore from '@/05_stores/service/service-store';
import DataTable, {
  type DataTableColumn,
} from '@/components/data-table/data-table';
import FancyboxViewer from '@/components/fancybox/fancybox-viewer';
import ReactImage from '@/components/image/react-image';
import InputGroup from '@/components/input-group/input-group';
import Tooltip from '@/components/tooltip/tooltip';
import PageHeader from '@/components/typography/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardBody } from '@/components/ui/card';
import { TableCell, TableRow } from '@/components/ui/table';
import useFancybox from '@/hooks/fancybox/use-fancybox';
import useTanstackPaginateQuery from '@/hooks/tanstack/use-tanstack-paginate-query';
import { getDateTimezone } from '@/lib/date/get-date-timezone';
import CreateServiceDialog from './_dialogs/create-service-dialog';
import DeleteServiceDialog from './_dialogs/delete-service-dialog';
import UpdateServiceDialog from './_dialogs/update-service-dialog';

const ServicesPage = () => {
  // Store
  const { setSelectedService } = useServiceStore();

  const [fancyboxRef] = useFancybox();

  // Dialog States
  const [openCreateServiceDialog, setOpenCreateServiceDialog] = useState(false);
  const [openUpdateServiceDialog, setOpenUpdateServiceDialog] = useState(false);
  const [openDeleteServiceDialog, setOpenDeleteServiceDialog] = useState(false);

  // Tanstack query hook for pagination
  const servicesPagination = useTanstackPaginateQuery<Service>({
    endpoint: '/services',
    defaultSort: 'id',
  });

  // Define table columns
  const columns: DataTableColumn[] = [
    { label: '#', column: 'id', className: 'w-[80px]' },
    { label: 'Label', column: 'label' },
    { label: 'Description', column: 'description' },
    { label: 'Slug' },
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
      <PageHeader className="mb-3">Services</PageHeader>

      {/* Card */}
      <Card ref={fancyboxRef}>
        <CardBody>
          {/* Data Table */}
          <DataTable
            pagination={servicesPagination}
            columns={columns}
            actions={actions}
          >
            {/* Render rows only if data is present */}
            {servicesPagination.data?.records
              ? servicesPagination.data.records.map(service => (
                  <TableRow key={service.id}>
                    <TableCell>{service.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="shrink-0">
                          <FancyboxViewer
                            baseUrl={import.meta.env.VITE_STORAGE_BASE_URL}
                            filePath={service.thumbnail_path}
                            data-fancybox={`${service.id}`}
                            data-caption={service.label}
                          >
                            <ReactImage
                              className="outline-primary border-card flex size-7 items-center justify-center overflow-hidden rounded-xs border-1 outline-2"
                              src={`${import.meta.env.VITE_STORAGE_BASE_URL}${service?.thumbnail_path}`}
                            />
                          </FancyboxViewer>
                        </div>

                        <div>
                          <h6 className="text-xs font-semibold">
                            {service.label}
                          </h6>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{service.description}</TableCell>
                    <TableCell>{service.slug}</TableCell>
                    <TableCell>
                      {getDateTimezone(service.created_at, 'date_time')}
                    </TableCell>
                    <TableCell>
                      <InputGroup size="sm">
                        {/* Update button */}
                        <Tooltip content="Update">
                          <Button
                            variant="info"
                            size="icon-xs"
                            onClick={() => {
                              setSelectedService(service);
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
                              setSelectedService(service);
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
        </CardBody>
      </Card>

      {/* Dialogs */}
      <CreateServiceDialog
        open={openCreateServiceDialog}
        setOpen={setOpenCreateServiceDialog}
        refetch={servicesPagination.refetch}
      />
      <UpdateServiceDialog
        open={openUpdateServiceDialog}
        setOpen={setOpenUpdateServiceDialog}
        refetch={servicesPagination.refetch}
      />
      <DeleteServiceDialog
        open={openDeleteServiceDialog}
        setOpen={setOpenDeleteServiceDialog}
        refetch={servicesPagination.refetch}
      />
    </>
  );
};

export default ServicesPage;
