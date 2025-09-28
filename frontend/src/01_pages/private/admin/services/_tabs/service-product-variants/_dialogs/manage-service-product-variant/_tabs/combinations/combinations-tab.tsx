import { useState } from 'react';
import { FaPenToSquare, FaTrash } from 'react-icons/fa6';
import type { ServiceProductVariantCombination } from '@/04_types/service/service-product-variant-combination';
import useServiceProductVariantCombinationStore from '@/05_stores/service/service-product-variant-combination-store';
import useServiceProductVariantStore from '@/05_stores/service/service-product-variant-store';
import type { DataTableColumn } from '@/components/data-table/data-table';
import DataTable from '@/components/data-table/data-table';
import InputGroup from '@/components/input-group/input-group';
import Tooltip from '@/components/tooltip/tooltip';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import useTanstackPaginateQuery from '@/hooks/tanstack/use-tanstack-paginate-query';
import { getDateTimezone } from '@/lib/date/get-date-timezone';
import CreateServiceProductVariantCombinationDialog from './_dialogs/create-service-product-variant-combination-dialog';
import DeleteServiceProductVariantCombinationDialog from './_dialogs/delete-service-product-variant-combination-dialog';
import UpdateServiceProductVariantCombinationDialog from './_dialogs/update-service-product-variant-combination-dialog';

const CombinationsTab = () => {
  // Store
  const { setSelectedServiceProductVariantCombination } =
    useServiceProductVariantCombinationStore();
  const { selectedServiceProductVariant } = useServiceProductVariantStore();

  // Dialog States
  const [
    openCreateServiceProductVariantCombinationDialog,
    setOpenCreateServiceProductVariantCombinationDialog,
  ] = useState(false);
  const [
    openUpdateServiceProductVariantCombinationDialog,
    setOpenUpdateServiceProductVariantCombinationDialog,
  ] = useState(false);
  const [
    openDeleteServiceProductVariantCombinationDialog,
    setOpenDeleteServiceProductVariantCombinationDialog,
  ] = useState(false);

  // Tanstack query hook for pagination
  const serviceProductVariantCombinationsPagination =
    useTanstackPaginateQuery<ServiceProductVariantCombination>({
      endpoint: '/services/products/variants/combinations',
      defaultSort: 'id',
      params: `service_product_variant_id=${selectedServiceProductVariant?.id}`,
    });

  // Define table columns
  const columns: DataTableColumn[] = [
    { label: 'Variant', column: 'id' },
    { label: 'Variant Value', column: 'id' },
    { label: 'Created At', column: 'created_at', className: 'w-[200px]' },
    { label: 'Actions', className: 'w-[100px]' },
  ];

  // Actions buttons
  const actions = (
    <Button
      size="sm"
      onClick={() => {
        setOpenCreateServiceProductVariantCombinationDialog(true);
      }}
    >
      Create
    </Button>
  );

  return (
    <>
      {/* Data Table */}
      <DataTable
        pagination={serviceProductVariantCombinationsPagination}
        columns={columns}
        actions={actions}
      >
        {/* Render rows only if data is present */}
        {serviceProductVariantCombinationsPagination.data?.records
          ? serviceProductVariantCombinationsPagination.data.records.map(
              serviceProductVariantCombination => (
                <TableRow key={serviceProductVariantCombination.id}>
                  <TableCell>
                    {
                      serviceProductVariantCombination.service_product_variant
                        ?.sku
                    }
                  </TableCell>
                  <TableCell>
                    {
                      serviceProductVariantCombination
                        .service_product_variant_value?.value
                    }
                  </TableCell>
                  <TableCell>
                    {getDateTimezone(
                      serviceProductVariantCombination.created_at,
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
                            setSelectedServiceProductVariantCombination(
                              serviceProductVariantCombination,
                            );
                            setOpenUpdateServiceProductVariantCombinationDialog(
                              true,
                            );
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
                            setSelectedServiceProductVariantCombination(
                              serviceProductVariantCombination,
                            );
                            setOpenDeleteServiceProductVariantCombinationDialog(
                              true,
                            );
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
      <CreateServiceProductVariantCombinationDialog
        open={openCreateServiceProductVariantCombinationDialog}
        setOpen={setOpenCreateServiceProductVariantCombinationDialog}
        refetch={serviceProductVariantCombinationsPagination.refetch}
      />
      <UpdateServiceProductVariantCombinationDialog
        open={openUpdateServiceProductVariantCombinationDialog}
        setOpen={setOpenUpdateServiceProductVariantCombinationDialog}
        refetch={serviceProductVariantCombinationsPagination.refetch}
      />
      <DeleteServiceProductVariantCombinationDialog
        open={openDeleteServiceProductVariantCombinationDialog}
        setOpen={setOpenDeleteServiceProductVariantCombinationDialog}
        refetch={serviceProductVariantCombinationsPagination.refetch}
      />
    </>
  );
};

export default CombinationsTab;
