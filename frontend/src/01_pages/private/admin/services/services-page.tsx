import { Outlet } from 'react-router';
import PageTabList from '@/components/tabs/page-tab/page-tab-list';
import PageTabTrigger from '@/components/tabs/page-tab/page-tab-trigger';
import PageHeader from '@/components/typography/page-header';

// Main users page component with tabbed interface
const ServicesPage = () => {
  return (
    <>
      <div className="mb-3 flex flex-col justify-between gap-1 @sm/main:flex-row @sm/main:items-center">
        <PageHeader>Services</PageHeader>

        <PageTabList>
          <PageTabTrigger to="services">Services</PageTabTrigger>
          <PageTabTrigger to="service-products">
            Service Products
          </PageTabTrigger>
          <PageTabTrigger to="service-product-variants">
            Service Product Variants
          </PageTabTrigger>
        </PageTabList>
      </div>

      <Outlet />
    </>
  );
};

export default ServicesPage;
