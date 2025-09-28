import { useState } from 'react';
import { FaPenToSquare, FaTrash } from 'react-icons/fa6';
import type { ServiceProductVariantAttribute } from '@/04_types/service/service-product-variant-attribute';
import useServiceProductVariantAttributeStore from '@/05_stores/service/service-product-variant-attribute-store';
import type { DataTableColumn } from '@/components/data-table/data-table';
import DataTable from '@/components/data-table/data-table';
import InputGroup from '@/components/input-group/input-group';
import Tooltip from '@/components/tooltip/tooltip';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import useTanstackPaginateQuery from '@/hooks/tanstack/use-tanstack-paginate-query';
import { getDateTimezone } from '@/lib/date/get-date-timezone';
import CreateServiceProductVariantAttributeDialog from './_dialogs/create-service-product-variant-attribute-dialog';
import DeleteServiceProductVariantAttributeDialog from './_dialogs/delete-service-product-variant-attribute-dialog';
import UpdateServiceProductVariantAttributeDialog from './_dialogs/update-service-product-variant-attribute-dialog';

const AttributesTab = () => {
  // Store
  const { setSelectedServiceProductVariantAttribute } =
    useServiceProductVariantAttributeStore();

  // Dialog States
  const [
    openCreateServiceProductVariantAttributeDialog,
    setOpenCreateServiceProductVariantAttributeDialog,
  ] = useState(false);
  const [
    openUpdateServiceProductVariantAttributeDialog,
    setOpenUpdateServiceProductVariantAttributeDialog,
  ] = useState(false);
  const [
    openDeleteServiceProductVariantAttributeDialog,
    setOpenDeleteServiceProductVariantAttributeDialog,
  ] = useState(false);

  // Tanstack query hook for pagination
  const serviceProductVariantAttributesPagination =
    useTanstackPaginateQuery<ServiceProductVariantAttribute>({
      endpoint: '/services/products/variants/attributes',
      defaultSort: 'label',
    });

  // Define table columns
  const columns: DataTableColumn[] = [
    { label: 'Label', column: 'label' },
    { label: 'Order', column: 'display_order' },
    { label: 'Created At', column: 'created_at', className: 'w-[200px]' },
    { label: 'Actions', className: 'w-[100px]' },
  ];

  // Actions buttons
  const actions = (
    <Button
      size="sm"
      onClick={() => {
        setOpenCreateServiceProductVariantAttributeDialog(true);
      }}
    >
      Create
    </Button>
  );

  return (
    <>
      {/* Data Table */}
      <DataTable
        pagination={serviceProductVariantAttributesPagination}
        columns={columns}
        actions={actions}
      >
        {/* Render rows only if data is present */}
        {serviceProductVariantAttributesPagination.data?.records
          ? serviceProductVariantAttributesPagination.data.records.map(
              serviceProductVariantAttribute => (
                <TableRow key={serviceProductVariantAttribute.id}>
                  <TableCell>{serviceProductVariantAttribute.label}</TableCell>
                  <TableCell>
                    {serviceProductVariantAttribute.display_order}
                  </TableCell>
                  <TableCell>
                    {getDateTimezone(
                      serviceProductVariantAttribute.created_at,
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
                            setSelectedServiceProductVariantAttribute(
                              serviceProductVariantAttribute,
                            );
                            setOpenUpdateServiceProductVariantAttributeDialog(
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
                            setSelectedServiceProductVariantAttribute(
                              serviceProductVariantAttribute,
                            );
                            setOpenDeleteServiceProductVariantAttributeDialog(
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
      <CreateServiceProductVariantAttributeDialog
        open={openCreateServiceProductVariantAttributeDialog}
        setOpen={setOpenCreateServiceProductVariantAttributeDialog}
        refetch={serviceProductVariantAttributesPagination.refetch}
      />
      <UpdateServiceProductVariantAttributeDialog
        open={openUpdateServiceProductVariantAttributeDialog}
        setOpen={setOpenUpdateServiceProductVariantAttributeDialog}
        refetch={serviceProductVariantAttributesPagination.refetch}
      />
      <DeleteServiceProductVariantAttributeDialog
        open={openDeleteServiceProductVariantAttributeDialog}
        setOpen={setOpenDeleteServiceProductVariantAttributeDialog}
        refetch={serviceProductVariantAttributesPagination.refetch}
      />
    </>
  );
};

export default AttributesTab;
