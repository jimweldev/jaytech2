import { useState } from 'react';
import { FaPenToSquare, FaTrash } from 'react-icons/fa6';
import type { ServiceProductVariantValue } from '@/04_types/service/service-product-variant-value';
import useServiceProductVariantValueStore from '@/05_stores/service/service-product-variant-value-store';
import type { DataTableColumn } from '@/components/data-table/data-table';
import DataTable from '@/components/data-table/data-table';
import InputGroup from '@/components/input-group/input-group';
import Tooltip from '@/components/tooltip/tooltip';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import useTanstackPaginateQuery from '@/hooks/tanstack/use-tanstack-paginate-query';
import { getDateTimezone } from '@/lib/date/get-date-timezone';
import CreateServiceProductVariantValueDialog from './_dialogs/create-service-product-variant-value-dialog';
import DeleteServiceProductVariantValueDialog from './_dialogs/delete-service-product-variant-value-dialog';
import UpdateServiceProductVariantValueDialog from './_dialogs/update-service-product-variant-value-dialog';

const ValuesTab = () => {
  // Store
  const { setSelectedServiceProductVariantValue } =
    useServiceProductVariantValueStore();

  // Dialog States
  const [
    openCreateServiceProductVariantValueDialog,
    setOpenCreateServiceProductVariantValueDialog,
  ] = useState(false);
  const [
    openUpdateServiceProductVariantValueDialog,
    setOpenUpdateServiceProductVariantValueDialog,
  ] = useState(false);
  const [
    openDeleteServiceProductVariantValueDialog,
    setOpenDeleteServiceProductVariantValueDialog,
  ] = useState(false);

  // Tanstack query hook for pagination
  const serviceProductVariantValuesPagination =
    useTanstackPaginateQuery<ServiceProductVariantValue>({
      endpoint: '/services/products/variants/values',
      defaultSort: 'value',
    });

  // Define table columns
  const columns: DataTableColumn[] = [
    { label: 'Attribute' },
    { label: 'Value', column: 'value' },
    { label: 'Order', column: 'display_order' },
    { label: 'Created At', column: 'created_at', className: 'w-[200px]' },
    { label: 'Actions', className: 'w-[100px]' },
  ];

  // Actions buttons
  const actions = (
    <Button
      size="sm"
      onClick={() => {
        setOpenCreateServiceProductVariantValueDialog(true);
      }}
    >
      Create
    </Button>
  );

  return (
    <>
      {/* Data Table */}
      <DataTable
        pagination={serviceProductVariantValuesPagination}
        columns={columns}
        actions={actions}
      >
        {/* Render rows only if data is present */}
        {serviceProductVariantValuesPagination.data?.records
          ? serviceProductVariantValuesPagination.data.records.map(
              serviceProductVariantValue => (
                <TableRow key={serviceProductVariantValue.id}>
                  <TableCell>
                    {
                      serviceProductVariantValue
                        .service_product_variant_attribute?.label
                    }
                  </TableCell>
                  <TableCell>{serviceProductVariantValue.value}</TableCell>
                  <TableCell>
                    {serviceProductVariantValue.display_order}
                  </TableCell>
                  <TableCell>
                    {getDateTimezone(
                      serviceProductVariantValue.created_at,
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
                            setSelectedServiceProductVariantValue(
                              serviceProductVariantValue,
                            );
                            setOpenUpdateServiceProductVariantValueDialog(true);
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
                            setSelectedServiceProductVariantValue(
                              serviceProductVariantValue,
                            );
                            setOpenDeleteServiceProductVariantValueDialog(true);
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

      {/* Dialogs */}
      <CreateServiceProductVariantValueDialog
        open={openCreateServiceProductVariantValueDialog}
        setOpen={setOpenCreateServiceProductVariantValueDialog}
        refetch={serviceProductVariantValuesPagination.refetch}
      />
      <UpdateServiceProductVariantValueDialog
        open={openUpdateServiceProductVariantValueDialog}
        setOpen={setOpenUpdateServiceProductVariantValueDialog}
        refetch={serviceProductVariantValuesPagination.refetch}
      />
      <DeleteServiceProductVariantValueDialog
        open={openDeleteServiceProductVariantValueDialog}
        setOpen={setOpenDeleteServiceProductVariantValueDialog}
        refetch={serviceProductVariantValuesPagination.refetch}
      />
    </>
  );
};

export default ValuesTab;
