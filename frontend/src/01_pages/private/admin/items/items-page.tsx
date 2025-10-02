import { useState } from 'react';
import { FaPenToSquare, FaTrash } from 'react-icons/fa6';
import type { ServiceItem } from '@/04_types/service/service-item';
import useServiceItemStore from '@/05_stores/service/service-item-store';
import DataTable, {
  type DataTableColumn,
} from '@/components/data-table/data-table';
import FancyboxViewer from '@/components/fancybox/fancybox-viewer';
import ReactImage from '@/components/image/react-image';
import InputGroup from '@/components/input-group/input-group';
import Tooltip from '@/components/tooltip/tooltip';
import PageHeader from '@/components/typography/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardBody } from '@/components/ui/card';
import { TableCell, TableRow } from '@/components/ui/table';
import useFancybox from '@/hooks/fancybox/use-fancybox';
import useTanstackPaginateQuery from '@/hooks/tanstack/use-tanstack-paginate-query';
import { getDateTimezone } from '@/lib/date/get-date-timezone';
import CreateItemDialog from './_dialogs/create-item-dialog';
import DeleteItemDialog from './_dialogs/delete-item-dialog';
import UpdateItemDialog from './_dialogs/update-item-dialog';

const ItemsPage = () => {
  // Store
  const { setSelectedServiceItem } = useServiceItemStore();

  const [fancyboxRef] = useFancybox();

  // Dialog States
  const [openCreateItemDialog, setOpenCreateItemDialog] = useState(false);
  const [openUpdateItemDialog, setOpenUpdateItemDialog] = useState(false);
  const [openDeleteItemDialog, setOpenDeleteItemDialog] = useState(false);

  // Tanstack query hook for pagination
  const itemsPagination = useTanstackPaginateQuery<ServiceItem>({
    endpoint: '/services/items',
    defaultSort: 'id',
  });

  // Define table columns
  const columns: DataTableColumn[] = [
    { label: '#', column: 'id', className: 'w-[80px]' },
    { label: 'Label', column: 'label' },
    { label: 'Brand' },
    { label: 'Service' },
    { label: 'Created At', column: 'created_at', className: 'w-[200px]' },
    { label: 'Actions', className: 'w-[100px]' },
  ];

  // Actions buttons
  const actions = (
    <Button
      size="sm"
      onClick={() => {
        setOpenCreateItemDialog(true);
      }}
    >
      Create
    </Button>
  );

  return (
    <>
      <PageHeader className="mb-3">Items</PageHeader>

      {/* Card */}
      <Card ref={fancyboxRef}>
        <CardBody>
          {/* Data Table */}
          <DataTable
            pagination={itemsPagination}
            columns={columns}
            actions={actions}
          >
            {/* Render rows only if data is present */}
            {itemsPagination.data?.records
              ? itemsPagination.data.records.map(item => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="shrink-0">
                          <FancyboxViewer
                            baseUrl={import.meta.env.VITE_STORAGE_BASE_URL}
                            filePath={item.thumbnail_path}
                            data-fancybox={`${item.id}`}
                            data-caption={item.label}
                          >
                            <ReactImage
                              className="outline-primary border-card flex size-7 items-center justify-center overflow-hidden rounded-xs border-1 outline-2"
                              src={`${import.meta.env.VITE_STORAGE_BASE_URL}${item?.thumbnail_path}`}
                            />
                          </FancyboxViewer>
                        </div>

                        <div>
                          <h6 className="text-xs font-semibold">
                            {item.label}
                          </h6>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="shrink-0">
                          <FancyboxViewer
                            baseUrl={import.meta.env.VITE_STORAGE_BASE_URL}
                            filePath={
                              item.service_brand_category?.service_brand
                                ?.thumbnail_path
                            }
                            data-fancybox={`${item.service_brand_category?.service_brand?.id}`}
                            data-caption={
                              item.service_brand_category?.service_brand?.label
                            }
                          >
                            <ReactImage
                              className="outline-primary border-card flex size-7 items-center justify-center overflow-hidden rounded-xs border-1 outline-2"
                              src={`${import.meta.env.VITE_STORAGE_BASE_URL}${item?.service_brand_category?.service_brand?.thumbnail_path}`}
                            />
                          </FancyboxViewer>
                        </div>

                        <div>
                          <h6 className="text-xs font-semibold">
                            {item.service_brand_category?.service_brand?.label}
                          </h6>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge>
                        {item.service_brand_category?.service?.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {getDateTimezone(item.created_at, 'date_time')}
                    </TableCell>
                    <TableCell>
                      <InputGroup size="sm">
                        {/* Update button */}
                        <Tooltip content="Update">
                          <Button
                            variant="info"
                            size="icon-xs"
                            onClick={() => {
                              setSelectedServiceItem(item);
                              setOpenUpdateItemDialog(true);
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
                              setSelectedServiceItem(item);
                              setOpenDeleteItemDialog(true);
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
      <CreateItemDialog
        open={openCreateItemDialog}
        setOpen={setOpenCreateItemDialog}
        refetch={itemsPagination.refetch}
      />
      <UpdateItemDialog
        open={openUpdateItemDialog}
        setOpen={setOpenUpdateItemDialog}
        refetch={itemsPagination.refetch}
      />
      <DeleteItemDialog
        open={openDeleteItemDialog}
        setOpen={setOpenDeleteItemDialog}
        refetch={itemsPagination.refetch}
      />
    </>
  );
};

export default ItemsPage;
