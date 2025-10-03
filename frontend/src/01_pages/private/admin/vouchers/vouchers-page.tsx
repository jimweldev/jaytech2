import { Outlet } from 'react-router';
import PageTabList from '@/components/tabs/page-tab/page-tab-list';
import PageTabTrigger from '@/components/tabs/page-tab/page-tab-trigger';
import PageHeader from '@/components/typography/page-header';

// Main users page component with tabbed interface
const VouchersPage = () => {
  return (
    <>
      <div className="mb-3 flex flex-col justify-between gap-1 @sm/main:flex-row @sm/main:items-center">
        <PageHeader>Vouchers</PageHeader>

        <PageTabList>
          <PageTabTrigger to="vouchers">Vouchers</PageTabTrigger>
          <PageTabTrigger to="claimed-vouchers">
            Claimed Vouchers
          </PageTabTrigger>
        </PageTabList>
      </div>

      <Outlet />
    </>
  );
};

export default VouchersPage;
