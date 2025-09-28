import { useState } from 'react';
import { FaPenToSquare, FaTrash } from 'react-icons/fa6';
import type { ServiceProduct } from '@/04_types/service/service-product';
import useServiceProductStore from '@/05_stores/service/service-product-store';
import type { DataTableColumn } from '@/components/data-table/data-table';
import DataTable from '@/components/data-table/data-table';
import InputGroup from '@/components/input-group/input-group';
import Tooltip from '@/components/tooltip/tooltip';
import { Button } from '@/components/ui/button';
import { Card, CardBody } from '@/components/ui/card';
import { TableCell, TableRow } from '@/components/ui/table';
import useTanstackPaginateQuery from '@/hooks/tanstack/use-tanstack-paginate-query';
import { getDateTimezone } from '@/lib/date/get-date-timezone';
import CreateServiceProductDialog from './_dialogs/create-service-product-dialog';
import DeleteServiceProductDialog from './_dialogs/delete-service-product-dialog';
import UpdateServiceProductDialog from './_dialogs/update-service-product-dialog';

const ServiceProductsTab = () => {
  // Store
  const { setSelectedServiceProduct } = useServiceProductStore();

  // Dialog States
  const [openCreateServiceProductDialog, setOpenCreateServiceProductDialog] =
    useState(false);
  const [openUpdateServiceProductDialog, setOpenUpdateServiceProductDialog] =
    useState(false);
  const [openDeleteServiceProductDialog, setOpenDeleteServiceProductDialog] =
    useState(false);

  // Tanstack query hook for pagination
  const serviceProductsPagination = useTanstackPaginateQuery<ServiceProduct>({
    endpoint: '/services/products',
    defaultSort: 'label',
  });

  // Define table columns
  const columns: DataTableColumn[] = [
    { label: '#', column: 'id' },
    { label: 'Service', column: 'service' },
    { label: 'Label', column: 'label' },
    { label: 'Description', column: 'description' },
    { label: 'Slug', column: 'slug' },
    { label: 'Created At', column: 'created_at', className: 'w-[200px]' },
    { label: 'Actions', className: 'w-[100px]' },
  ];

  // Actions buttons
  const actions = (
    <Button
      size="sm"
      onClick={() => {
        setOpenCreateServiceProductDialog(true);
      }}
    >
      Create
    </Button>
  );

  return (
    <>
      {/* Card */}
      <Card>
        <CardBody>
          {/* Data Table */}
          <DataTable
            pagination={serviceProductsPagination}
            columns={columns}
            actions={actions}
          >
            {/* Render rows only if data is present */}
            {serviceProductsPagination.data?.records
              ? serviceProductsPagination.data.records.map(serviceProduct => (
                  <TableRow key={serviceProduct.id}>
                    <TableCell>{serviceProduct.id}</TableCell>
                    <TableCell>{serviceProduct.service?.label}</TableCell>
                    <TableCell>{serviceProduct.label}</TableCell>
                    <TableCell>{serviceProduct.description}</TableCell>
                    <TableCell>{serviceProduct.slug}</TableCell>
                    <TableCell>
                      {getDateTimezone(serviceProduct.created_at, 'date_time')}
                    </TableCell>
                    <TableCell>
                      <InputGroup size="sm">
                        {/* Update button */}
                        <Tooltip content="Update">
                          <Button
                            variant="info"
                            size="icon-xs"
                            onClick={() => {
                              setSelectedServiceProduct(serviceProduct);
                              setOpenUpdateServiceProductDialog(true);
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
                              setSelectedServiceProduct(serviceProduct);
                              setOpenDeleteServiceProductDialog(true);
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
      <CreateServiceProductDialog
        open={openCreateServiceProductDialog}
        setOpen={setOpenCreateServiceProductDialog}
        refetch={serviceProductsPagination.refetch}
      />
      <UpdateServiceProductDialog
        open={openUpdateServiceProductDialog}
        setOpen={setOpenUpdateServiceProductDialog}
        refetch={serviceProductsPagination.refetch}
      />
      <DeleteServiceProductDialog
        open={openDeleteServiceProductDialog}
        setOpen={setOpenDeleteServiceProductDialog}
        refetch={serviceProductsPagination.refetch}
      />
    </>
  );
};

export default ServiceProductsTab;
