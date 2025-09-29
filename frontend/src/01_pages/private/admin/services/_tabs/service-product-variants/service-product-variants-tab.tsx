import { useState } from 'react';
import { FaPenToSquare, FaTrash } from 'react-icons/fa6';
import type { ServiceProductVariant } from '@/04_types/service/service-product-variant';
import useServiceProductVariantStore from '@/05_stores/service/service-product-variant-store';
import type { DataTableColumn } from '@/components/data-table/data-table';
import DataTable from '@/components/data-table/data-table';
import InputGroup from '@/components/input-group/input-group';
import Tooltip from '@/components/tooltip/tooltip';
import { Button } from '@/components/ui/button';
import { Card, CardBody } from '@/components/ui/card';
import { TableCell, TableRow } from '@/components/ui/table';
import useTanstackPaginateQuery from '@/hooks/tanstack/use-tanstack-paginate-query';
import { getDateTimezone } from '@/lib/date/get-date-timezone';
import CreateServiceProductVariantDialog from './_dialogs/create-service-product-variant-dialog';
import DeleteServiceProductVariantDialog from './_dialogs/delete-service-product-variant-dialog';
import ManageServiceProductVariantDialog from './_dialogs/manage-service-product-variant/manage-service-product-variant-dialog';
import UpdateServiceProductVariantDialog from './_dialogs/update-service-product-variant-dialog';

const ServiceProductVariantsTab = () => {
  // Store
  const { setSelectedServiceProductVariant } = useServiceProductVariantStore();

  // Dialog States
  const [
    openCreateServiceProductVariantDialog,
    setOpenCreateServiceProductVariantDialog,
  ] = useState(false);
  const [
    openUpdateServiceProductVariantDialog,
    setOpenUpdateServiceProductVariantDialog,
  ] = useState(false);
  const [
    openManageServiceProductVariantDialog,
    setOpenManageServiceProductVariantDialog,
  ] = useState(false);
  const [
    openDeleteServiceProductVariantDialog,
    setOpenDeleteServiceProductVariantDialog,
  ] = useState(false);

  // Tanstack query hook for pagination
  const serviceProductVariantsPagination =
    useTanstackPaginateQuery<ServiceProductVariant>({
      endpoint: '/services/products/variants',
      defaultSort: 'sku',
    });

  // Define table columns
  const columns: DataTableColumn[] = [
    { label: '#', column: 'id' },
    { label: 'Product', column: 'product_id' },
    { label: 'Sku', column: 'sku' },
    { label: 'Price', column: 'price' },
    { label: 'Created At', column: 'created_at', className: 'w-[200px]' },
    { label: 'Actions', className: 'w-[100px]' },
  ];

  // Actions buttons
  const actions = (
    <Button
      size="sm"
      onClick={() => {
        setOpenCreateServiceProductVariantDialog(true);
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
            pagination={serviceProductVariantsPagination}
            columns={columns}
            actions={actions}
          >
            {/* Render rows only if data is present */}
            {serviceProductVariantsPagination.data?.records
              ? serviceProductVariantsPagination.data.records.map(
                  serviceProductVariant => (
                    <TableRow key={serviceProductVariant.id}>
                      <TableCell>{serviceProductVariant.id}</TableCell>
                      <TableCell>
                        {serviceProductVariant.product?.label}
                      </TableCell>
                      <TableCell>{serviceProductVariant.sku}</TableCell>
                      <TableCell>{serviceProductVariant.price}</TableCell>
                      <TableCell>
                        {getDateTimezone(
                          serviceProductVariant.created_at,
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
                                setSelectedServiceProductVariant(
                                  serviceProductVariant,
                                );
                                setOpenUpdateServiceProductVariantDialog(true);
                              }}
                            >
                              <FaPenToSquare />
                            </Button>
                          </Tooltip>

                          {/* Manage button */}
                          <Tooltip content="Manage variant">
                            <Button
                              variant="warning"
                              size="icon-xs"
                              onClick={() => {
                                setSelectedServiceProductVariant(
                                  serviceProductVariant,
                                );
                                setOpenManageServiceProductVariantDialog(true);
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
                                setSelectedServiceProductVariant(
                                  serviceProductVariant,
                                );
                                setOpenDeleteServiceProductVariantDialog(true);
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
      <CreateServiceProductVariantDialog
        open={openCreateServiceProductVariantDialog}
        setOpen={setOpenCreateServiceProductVariantDialog}
        refetch={serviceProductVariantsPagination.refetch}
      />
      <UpdateServiceProductVariantDialog
        open={openUpdateServiceProductVariantDialog}
        setOpen={setOpenUpdateServiceProductVariantDialog}
        refetch={serviceProductVariantsPagination.refetch}
      />
      <ManageServiceProductVariantDialog
        open={openManageServiceProductVariantDialog}
        setOpen={setOpenManageServiceProductVariantDialog}
        refetch={serviceProductVariantsPagination.refetch}
      />
      <DeleteServiceProductVariantDialog
        open={openDeleteServiceProductVariantDialog}
        setOpen={setOpenDeleteServiceProductVariantDialog}
        refetch={serviceProductVariantsPagination.refetch}
      />
    </>
  );
};

export default ServiceProductVariantsTab;
