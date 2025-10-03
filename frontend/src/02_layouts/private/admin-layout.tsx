import {
  FaChartArea,
  FaCopyright,
  FaEnvelope,
  FaGears,
  FaLaptopCode,
  FaLocationDot,
  FaScrewdriverWrench,
  FaToolbox,
  FaUsers,
} from 'react-icons/fa6';
import { Outlet } from 'react-router';
import { type SidebarGroup } from '@/03_templates/main-template/_components/sidebar/app-sidebar';
import MainTemplate from '@/03_templates/main-template/main-template';

const AdminLayout = () => {
  const sidebarGroups: SidebarGroup[] = [
    {
      sidebarLabel: 'Admin',
      sidebarItems: [
        {
          title: 'Dashboard',
          url: '/admin',
          icon: FaChartArea,
          end: true,
        },
        {
          title: 'Users',
          url: '/admin/users',
          icon: FaUsers,
        },
        {
          title: 'Systems',
          url: '/admin/systems',
          icon: FaGears,
        },
        {
          title: 'Mails',
          url: '/admin/mails',
          icon: FaEnvelope,
        },
        {
          title: 'Services',
          url: '/admin/services',
          icon: FaToolbox,
        },
        {
          title: 'Items',
          url: '/admin/items',
          icon: FaScrewdriverWrench,
        },
        {
          title: 'Brands',
          url: '/admin/brands',
          icon: FaCopyright,
        },

        {
          title: 'Models',
          url: '/admin/models',
          icon: FaLaptopCode,
        },
        {
          title: 'Drop Points',
          url: '/admin/drop-points',
          icon: FaLocationDot,
        },
      ],
    },
  ];

  return (
    <MainTemplate sidebarGroups={sidebarGroups}>
      <Outlet />
    </MainTemplate>
  );
};

export default AdminLayout;
