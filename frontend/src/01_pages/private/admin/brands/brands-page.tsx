import { useState } from 'react';
import { FaPenToSquare, FaRegCircleXmark, FaTrash } from 'react-icons/fa6';
import type { ServiceBrand } from '@/04_types/service/service-brand';
import useServiceBrandStore from '@/05_stores/service/service-brand-store';
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
import CreateBrandDialog from './_dialogs/create-brand-dialog';
import DeleteBrandDialog from './_dialogs/delete-brand-dialog';
import UpdateBrandDialog from './_dialogs/update-brand-dialog';

const BrandsPage = () => {
  // Store
  const { setSelectedServiceBrand } = useServiceBrandStore();

  const [fancyboxRef] = useFancybox();

  // Dialog States
  const [openCreateBrandDialog, setOpenCreateBrandDialog] = useState(false);
  const [openUpdateBrandDialog, setOpenUpdateBrandDialog] = useState(false);
  const [openDeleteBrandDialog, setOpenDeleteBrandDialog] = useState(false);

  // Tanstack query hook for pagination
  const brandsPagination = useTanstackPaginateQuery<ServiceBrand>({
    endpoint: '/services/brands',
    defaultSort: 'id',
  });

  // Define table columns
  const columns: DataTableColumn[] = [
    { label: '#', column: 'id', className: 'w-[80px]' },
    { label: 'Label', column: 'label' },
    { label: 'Services' },
    { label: 'Created At', column: 'created_at', className: 'w-[200px]' },
    { label: 'Actions', className: 'w-[100px]' },
  ];

  // Actions buttons
  const actions = (
    <Button
      size="sm"
      onClick={() => {
        setOpenCreateBrandDialog(true);
      }}
    >
      Create
    </Button>
  );

  return (
    <>
      <PageHeader className="mb-3">Brands</PageHeader>

      {/* Card */}
      <Card ref={fancyboxRef}>
        <CardBody>
          {/* Data Table */}
          <DataTable
            pagination={brandsPagination}
            columns={columns}
            actions={actions}
          >
            {/* Render rows only if data is present */}
            {brandsPagination.data?.records
              ? brandsPagination.data.records.map(brand => (
                  <TableRow key={brand.id}>
                    <TableCell>{brand.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="shrink-0">
                          <FancyboxViewer
                            baseUrl={import.meta.env.VITE_STORAGE_BASE_URL}
                            filePath={brand.thumbnail_path}
                            data-fancybox={`${brand.id}`}
                            data-caption={brand.label}
                            fallback="/images/default-avatar.png"
                          >
                            <ReactImage
                              className="outline-primary border-card flex size-7 items-center justify-center overflow-hidden rounded-xs border-1 outline-2"
                              src={`${import.meta.env.VITE_STORAGE_BASE_URL}${brand?.thumbnail_path}`}
                              fallback="/images/default-avatar.png"
                            />
                          </FancyboxViewer>
                        </div>

                        <div>
                          <h6 className="text-xs font-semibold">
                            {brand.label}
                          </h6>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap items-center gap-1">
                        {brand?.service_brand_categories?.length === 0 ? (
                          <Badge variant="outline">
                            <FaRegCircleXmark />
                            No categories
                          </Badge>
                        ) : (
                          <div className="flex flex-wrap items-center gap-1">
                            {brand?.service_brand_categories?.map(category => (
                              <Badge key={category.id}>
                                {category?.service?.label}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getDateTimezone(brand.created_at, 'date_time')}
                    </TableCell>
                    <TableCell>
                      <InputGroup size="sm">
                        {/* Update button */}
                        <Tooltip content="Update">
                          <Button
                            variant="info"
                            size="icon-xs"
                            onClick={() => {
                              setSelectedServiceBrand(brand);
                              setOpenUpdateBrandDialog(true);
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
                              setSelectedServiceBrand(brand);
                              setOpenDeleteBrandDialog(true);
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
      <CreateBrandDialog
        open={openCreateBrandDialog}
        setOpen={setOpenCreateBrandDialog}
        refetch={brandsPagination.refetch}
      />
      <UpdateBrandDialog
        open={openUpdateBrandDialog}
        setOpen={setOpenUpdateBrandDialog}
        refetch={brandsPagination.refetch}
      />
      <DeleteBrandDialog
        open={openDeleteBrandDialog}
        setOpen={setOpenDeleteBrandDialog}
        refetch={brandsPagination.refetch}
      />
    </>
  );
};

export default BrandsPage;
