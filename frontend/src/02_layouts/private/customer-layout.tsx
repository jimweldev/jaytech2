import CustomerTemplate from '@/03_templates/main-template/customer-template/customer-template';
import { Outlet } from 'react-router';

const CustomerLayout = () => {
  return (
    <CustomerTemplate>
      <Outlet />
    </CustomerTemplate>
  );
};

export default CustomerLayout;
