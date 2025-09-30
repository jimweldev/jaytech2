import { useState } from 'react';
import { FaPenToSquare, FaTrash } from 'react-icons/fa6';
import type { ServiceBrandModel } from '@/04_types/service/service-brand-model';
import useServiceBrandModelStore from '@/05_stores/service/service-brand-model-store';
import DataTable, {
  type DataTableColumn,
} from '@/components/data-table/data-table';
import InputGroup from '@/components/input-group/input-group';
import Tooltip from '@/components/tooltip/tooltip';
import PageHeader from '@/components/typography/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardBody } from '@/components/ui/card';
import { TableCell, TableRow } from '@/components/ui/table';
import useFancybox from '@/hooks/fancybox/use-fancybox';
import useTanstackPaginateQuery from '@/hooks/tanstack/use-tanstack-paginate-query';
import { getDateTimezone } from '@/lib/date/get-date-timezone';
import CreateModelDialog from './_dialogs/create-model-dialog';
import DeleteModelDialog from './_dialogs/delete-model-dialog';
import UpdateModelDialog from './_dialogs/update-model-dialog';

const ModelsPage = () => {
  // Store
  const { setSelectedServiceBrandModel } = useServiceBrandModelStore();

  const [fancyboxRef] = useFancybox();

  // Dialog States
  const [openCreateModelDialog, setOpenCreateModelDialog] = useState(false);
  const [openUpdateModelDialog, setOpenUpdateModelDialog] = useState(false);
  const [openDeleteModelDialog, setOpenDeleteModelDialog] = useState(false);

  // Tanstack query hook for pagination
  const modelsPagination = useTanstackPaginateQuery<ServiceBrandModel>({
    endpoint: '/services/brands/models',
    defaultSort: 'id',
  });

  // Define table columns
  const columns: DataTableColumn[] = [
    { label: '#', column: 'id', className: 'w-[80px]' },
    { label: 'Brand' },
    { label: 'Label', column: 'label' },
    { label: 'Category' },
    { label: 'Created At', column: 'created_at', className: 'w-[200px]' },
    { label: 'Actions', className: 'w-[100px]' },
  ];

  // Actions buttons
  const actions = (
    <Button
      size="sm"
      onClick={() => {
        setOpenCreateModelDialog(true);
      }}
    >
      Create
    </Button>
  );

  return (
    <>
      <PageHeader className="mb-3">Data Table List</PageHeader>

      {/* Card */}
      <Card ref={fancyboxRef}>
        <CardBody>
          {/* Data Table */}
          <DataTable
            pagination={modelsPagination}
            columns={columns}
            actions={actions}
          >
            {/* Render rows only if data is present */}
            {modelsPagination.data?.records
              ? modelsPagination.data.records.map(model => (
                  <TableRow key={model.id}>
                    <TableCell>{model.id}</TableCell>
                    <TableCell>{model.service_brand?.label}</TableCell>
                    <TableCell>{model.label}</TableCell>
                    <TableCell>{model.service_brand_category?.label}</TableCell>

                    <TableCell>
                      {getDateTimezone(model.created_at, 'date_time')}
                    </TableCell>
                    <TableCell>
                      <InputGroup size="sm">
                        {/* Update button */}
                        <Tooltip content="Update">
                          <Button
                            variant="info"
                            size="icon-xs"
                            onClick={() => {
                              setSelectedServiceBrandModel(model);
                              setOpenUpdateModelDialog(true);
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
                              setSelectedServiceBrandModel(model);
                              setOpenDeleteModelDialog(true);
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
      <CreateModelDialog
        open={openCreateModelDialog}
        setOpen={setOpenCreateModelDialog}
        refetch={modelsPagination.refetch}
      />
      <UpdateModelDialog
        open={openUpdateModelDialog}
        setOpen={setOpenUpdateModelDialog}
        refetch={modelsPagination.refetch}
      />
      <DeleteModelDialog
        open={openDeleteModelDialog}
        setOpen={setOpenDeleteModelDialog}
        refetch={modelsPagination.refetch}
      />
    </>
  );
};

export default ModelsPage;
