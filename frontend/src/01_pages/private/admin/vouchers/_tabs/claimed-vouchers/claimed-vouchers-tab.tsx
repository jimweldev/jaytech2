import type { ServiceClaimedVoucher } from '@/04_types/service/service-claimed-voucher';
import DataTable, {
  type DataTableColumn,
} from '@/components/data-table/data-table';
import { Card, CardBody } from '@/components/ui/card';
import { TableCell, TableRow } from '@/components/ui/table';
import useTanstackPaginateQuery from '@/hooks/tanstack/use-tanstack-paginate-query';
import { getDateTimezone } from '@/lib/date/get-date-timezone';
import { formatNumber } from '@/lib/number/format-number';
import { formatName } from '@/lib/user/format-name';

const VouchersPage = () => {
  // Tanstack query hook for pagination
  const vouchersPagination = useTanstackPaginateQuery<ServiceClaimedVoucher>({
    endpoint: '/services/claimed-vouchers',
    defaultSort: 'id',
  });

  // Define table columns
  const columns: DataTableColumn[] = [
    { label: '#', column: 'id', className: 'w-[80px]' },
    { label: 'Code' },
    { label: 'Customer' },
    { label: 'Amount', column: 'amount' },
    { label: 'Created At', column: 'created_at', className: 'w-[200px]' },
  ];

  return (
    <>
      {/* Card */}
      <Card>
        <CardBody>
          {/* Data Table */}
          <DataTable pagination={vouchersPagination} columns={columns}>
            {/* Render rows only if data is present */}
            {vouchersPagination.data?.records
              ? vouchersPagination.data.records.map(voucher => (
                  <TableRow key={voucher.id}>
                    <TableCell>{voucher.id}</TableCell>
                    <TableCell>{voucher.service_voucher?.code}</TableCell>
                    <TableCell>€{formatNumber(voucher.amount, 2)}</TableCell>
                    <TableCell>
                      {formatName(voucher.customer, 'semifull')}
                    </TableCell>
                    <TableCell>
                      {getDateTimezone(voucher.created_at, 'date_time')}
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </DataTable>
        </CardBody>
      </Card>
    </>
  );
};

export default VouchersPage;
