import { useState } from 'react';
import { FaPenToSquare, FaTrash } from 'react-icons/fa6';
import type { ServiceVoucher } from '@/04_types/service/service-voucher';
import useServiceVoucherStore from '@/05_stores/service/service-voucher-store';
import DataTable, {
  type DataTableColumn,
} from '@/components/data-table/data-table';
import InputGroup from '@/components/input-group/input-group';
import Tooltip from '@/components/tooltip/tooltip';
import { Button } from '@/components/ui/button';
import { Card, CardBody } from '@/components/ui/card';
import { TableCell, TableRow } from '@/components/ui/table';
import useTanstackPaginateQuery from '@/hooks/tanstack/use-tanstack-paginate-query';
import { getDateTimezone } from '@/lib/date/get-date-timezone';
import { formatNumber } from '@/lib/number/format-number';
import CreateVoucherDialog from './_dialogs/create-voucher-dialog';
import DeleteVoucherDialog from './_dialogs/delete-voucher-dialog';
import UpdateVoucherDialog from './_dialogs/update-voucher-dialog';

const VouchersPage = () => {
  // Store
  const { setSelectedServiceVoucher } = useServiceVoucherStore();

  // Dialog States
  const [openCreateVoucherDialog, setOpenCreateVoucherDialog] = useState(false);
  const [openUpdateVoucherDialog, setOpenUpdateVoucherDialog] = useState(false);
  const [openDeleteVoucherDialog, setOpenDeleteVoucherDialog] = useState(false);

  // Tanstack query hook for pagination
  const vouchersPagination = useTanstackPaginateQuery<ServiceVoucher>({
    endpoint: '/services/vouchers',
    defaultSort: 'id',
  });

  // Define table columns
  const columns: DataTableColumn[] = [
    { label: '#', column: 'id', className: 'w-[80px]' },
    { label: 'Code', column: 'code' },
    { label: 'Amount', column: 'amount' },
    { label: 'Issue Date', column: 'issue_date' },
    { label: 'Expiry Date', column: 'expiry_date' },
    { label: 'Created At', column: 'created_at', className: 'w-[200px]' },
    { label: 'Actions', className: 'w-[100px]' },
  ];

  // Actions buttons
  const actions = (
    <Button
      size="sm"
      onClick={() => {
        setOpenCreateVoucherDialog(true);
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
            pagination={vouchersPagination}
            columns={columns}
            actions={actions}
          >
            {/* Render rows only if data is present */}
            {vouchersPagination.data?.records
              ? vouchersPagination.data.records.map(voucher => (
                  <TableRow key={voucher.id}>
                    <TableCell>{voucher.id}</TableCell>
                    <TableCell>{voucher.code}</TableCell>
                    <TableCell>€{formatNumber(voucher.amount, 2)}</TableCell>
                    <TableCell>
                      {getDateTimezone(voucher.issue_date, 'date')}
                    </TableCell>
                    <TableCell>
                      {getDateTimezone(voucher.expiry_date, 'date')}
                    </TableCell>
                    <TableCell>
                      {getDateTimezone(voucher.created_at, 'date_time')}
                    </TableCell>
                    <TableCell>
                      <InputGroup size="sm">
                        {/* Update button */}
                        <Tooltip content="Update">
                          <Button
                            variant="info"
                            size="icon-xs"
                            onClick={() => {
                              setSelectedServiceVoucher(voucher);
                              setOpenUpdateVoucherDialog(true);
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
                              setSelectedServiceVoucher(voucher);
                              setOpenDeleteVoucherDialog(true);
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
      <CreateVoucherDialog
        open={openCreateVoucherDialog}
        setOpen={setOpenCreateVoucherDialog}
        refetch={vouchersPagination.refetch}
      />
      <UpdateVoucherDialog
        open={openUpdateVoucherDialog}
        setOpen={setOpenUpdateVoucherDialog}
        refetch={vouchersPagination.refetch}
      />
      <DeleteVoucherDialog
        open={openDeleteVoucherDialog}
        setOpen={setOpenDeleteVoucherDialog}
        refetch={vouchersPagination.refetch}
      />
    </>
  );
};

export default VouchersPage;
