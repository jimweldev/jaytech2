import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import BrandsPage from './01_pages/private/admin/brands/brands-page';
import DashboardPage from './01_pages/private/admin/dashboard/dashboard-page';
import ItemsPage from './01_pages/private/admin/items/items-page';
import MailLogsTab from './01_pages/private/admin/mails/_tabs/mail-logs/mail-logs-tab';
import MailTemplatesTab from './01_pages/private/admin/mails/_tabs/mail-templates/mail-templates-tab';
import MailsPage from './01_pages/private/admin/mails/mails-page';
import ModelsPage from './01_pages/private/admin/models/models-page';
import ServicesPage from './01_pages/private/admin/services/services-page';
import GlobalDropdownsTab from './01_pages/private/admin/systems/_tabs/global-dropdowns/global-dropdowns-tab';
import SystemSettingsTab from './01_pages/private/admin/systems/_tabs/system-settings/system-settings-tab';
import SystemsPage from './01_pages/private/admin/systems/systems-page';
import ActiveUsersTab from './01_pages/private/admin/users/_tabs/active-users/active-users-tab';
import ArchivedUsersTab from './01_pages/private/admin/users/_tabs/archived-users/archived-users-tab';
import PermissionsTab from './01_pages/private/admin/users/_tabs/rbac/_tabs/permissions/permissions-tab';
import RolesTab from './01_pages/private/admin/users/_tabs/rbac/_tabs/roles/roles-tab';
import RbacTab from './01_pages/private/admin/users/_tabs/rbac/rbac-tab';
import UsersPage from './01_pages/private/admin/users/users-page';
import CustomerHomePage from './01_pages/private/customer/home/home-page';
import DataTableGridPage from './01_pages/private/examples/data-table/data-table-grid-page';
import DataTableListGridPage from './01_pages/private/examples/data-table/data-table-list-grid-page';
import DataTableListPage from './01_pages/private/examples/data-table/data-table-list-page';
import CheckboxPage from './01_pages/private/examples/forms/checkbox-page';
import GlobalDropdownPage from './01_pages/private/examples/forms/global-dropdown-page';
import InputPage from './01_pages/private/examples/forms/input-page';
import RadioGroupPage from './01_pages/private/examples/forms/radio-group-page';
import ReactDropzonePage from './01_pages/private/examples/forms/react-dropzone-page';
import ReactQuillPage from './01_pages/private/examples/forms/react-quill-page';
import TextareaPage from './01_pages/private/examples/forms/textarea-page';
import SuccessPage from './01_pages/private/fallbacks/payment-success-page';
import HomePage from './01_pages/private/home/home-page';
import GeneralPage from './01_pages/private/settings/general-page';
import PasswordPage from './01_pages/private/settings/password-page';
import ProfilePage from './01_pages/private/settings/profile/profile-page';
import LoginPage from './01_pages/public/login-page';
import AdminLayout from './02_layouts/private/admin-layout';
import CustomerLayout from './02_layouts/private/customer-layout';
import ExamplesLayout from './02_layouts/private/examples-layout';
import HomeLayout from './02_layouts/private/home-layout';
import PrivateLayout from './02_layouts/private/private-layout';
import SettingsLayout from './02_layouts/private/settings-layout';
import PublicLayout from './02_layouts/public/public-layout';
import useAuthUserStore from './05_stores/_common/auth-user-store';
import CartPage from './01_pages/private/customer/cart/cart-page';
import BagPage from './01_pages/private/customer/bag/bag-page';
import BagTab from './01_pages/private/customer/bag/bag-tabs/bag-tab';
import ViewServicePage from './01_pages/private/customer/home/_components/services/car-upgrade/view-service-page';
import CheckoutPage from './01_pages/private/customer/home/_components/services/car-upgrade/checkout/checkout-page';
import CarBrandPage from './01_pages/private/customer/home/_components/services/car-upgrade/car-brands-page';
import ComputerBrandPage from './01_pages/private/customer/home/_components/services/computer-upgrade/computer-brands-page';
import RepairBrandPage from './01_pages/private/customer/home/_components/services/repair/repair-brands-page';

const App = () => {
  const { token, user } = useAuthUserStore();

  const customerRoutes = [
    // CUSTOMER LAYOUT
    {
      element: <CustomerLayout />,
      children: [
        {
          path: '',
          element: <CustomerHomePage />,
        },
        {
          path: 'services',
          element: <h1>Services</h1>,
        },
        {
          path: "service/car-upgrade",
          children: [
            {
              path: '',
              element: <CarBrandPage />,
            },
            {

              path: "brand/:brand",
              element: <ViewServicePage />,
            },
          ]
        },

        {
          path: 'service/computer-upgrade',
          children: [
            {
              path: '',
              element: <ComputerBrandPage />,
            }
          ]
        },

        {
          path: 'service/repair',
          children: [
            {
              path: '',
              element: <RepairBrandPage />,
            }
          ]
        },

        {
          path: 'cart',
          children: [
            {
              path: '',
              element: <CartPage />,
            },
            {
              path: 'checkout',
              element: <CheckoutPage />,
            },
          ],
        },
        {
          path: 'bag',
          element: <BagPage />,
          children: [
            {
              path: '',
              element: <Navigate to="all" replace />,
            },
            {
              path: ':bagTab',
              element: <BagTab />,
            },
          ],
        },
      ],
    },
  ];

  const privateRoutes = [
    {
      element: <PrivateLayout />,
      children: [
        // ACCOUNT TYPE | MAIN
        ...(user?.account_type === 'Main'
          ? [
            // ADMIN LAYOUT
            {
              path: 'admin',
              element: <AdminLayout />,
              children: [
                {
                  index: true,
                  element: <DashboardPage />,
                },
                {
                  path: 'users',
                  element: <UsersPage />,
                  children: [
                    {
                      index: true,
                      element: <Navigate to="active-users" replace />,
                    },
                    {
                      path: 'active-users',
                      element: <ActiveUsersTab />,
                    },
                    {
                      path: 'archived-users',
                      element: <ArchivedUsersTab />,
                    },
                    {
                      path: 'rbac',
                      element: <RbacTab />,
                      children: [
                        {
                          index: true,
                          element: <Navigate to="roles" replace />,
                        },
                        {
                          path: 'roles',
                          element: <RolesTab />,
                        },
                        {
                          path: 'permissions',
                          element: <PermissionsTab />,
                        },
                      ],
                    },
                  ],
                },
                {
                  path: 'systems',
                  element: <SystemsPage />,
                  children: [
                    {
                      index: true,
                      element: <Navigate to="system-settings" replace />,
                    },
                    {
                      path: 'system-settings',
                      element: <SystemSettingsTab />,
                    },
                    {
                      path: 'global-dropdowns',
                      element: <GlobalDropdownsTab />,
                    },
                  ],
                },
                {
                  path: 'mails',
                  element: <MailsPage />,
                  children: [
                    {
                      index: true,
                      element: <Navigate to="logs" replace />,
                    },
                    {
                      path: 'logs',
                      element: <MailLogsTab />,
                    },
                    {
                      path: 'templates',
                      element: <MailTemplatesTab />,
                    },
                  ],
                },
                {
                  path: 'services',
                  element: <ServicesPage />,
                  children: [
                    {
                      index: true,
                      element: <Navigate to="services" replace />,
                    },
                    {
                      path: 'services',
                      element: <ServicesTab />,
                    },
                    {
                      path: 'service-products',
                      element: <ServiceProductsTab />,
                    },
                    {
                      path: 'service-product-variants',
                      element: <ServiceProductVariantsTab />,
                    },
                  ],
                },
              ],
            },
            // HOME LAYOUT
            {
              element: <HomeLayout />,
              children: [
                {
                  path: '',
                  element: <HomePage />,
                },
              ],
            },
            // SETTINGS LAYOUT
            {
              path: 'settings',
              element: <SettingsLayout />,
              children: [
                {
                  index: true,
                  element: <Navigate to="profile" replace />,
                },
                {
                  path: 'profile',
                  element: <ProfilePage />,
                },
                {
                  path: 'password',
                  element: <PasswordPage />,
                },
                {
                  path: 'general',
                  element: <GeneralPage />,
                },
              ],
            },
            // EXAMPLES LAYOUT
            {
              path: 'examples',
              element: <ExamplesLayout />,
              children: [
                {
                  index: true,
                  element: <Navigate to="forms" replace />,
                },
                {
                  path: 'forms',
                  children: [
                    {
                      index: true,
                      element: <InputPage />,
                    },
                    {
                      path: 'textarea',
                      element: <TextareaPage />,
                    },
                    {
                      path: 'checkbox',
                      element: <CheckboxPage />,
                    },
                    {
                      path: 'radio-group',
                      element: <RadioGroupPage />,
                    },
                    {
                      path: 'react-dropzone',
                      element: <ReactDropzonePage />,
                    },
                    {
                      path: 'react-quill',
                      element: <ReactQuillPage />,
                    },
                    {
                      path: 'global-dropdown',
                      element: <GlobalDropdownPage />,
                    },
                  ],
                },
                {
                  path: 'data-table',
                  children: [
                    {
                      index: true,
                      element: <DataTableListPage />,
                    },
                    {
                      path: 'grid',
                      element: <DataTableGridPage />,
                    },
                    {
                      path: 'list-grid',
                      element: <DataTableListGridPage />,
                    },
                  ],
                },
              ],
            },
          ]
          : []),

        // ACCOUNT TYPE | CUSTOMER
        ...(user?.account_type === 'Customer' ? customerRoutes : []),

        // success page
        {
          path: 'success',
          element: <SuccessPage />,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ];

  const publicRoutes = [
    {
      element: <PublicLayout />,
      children: [
        {
          path: '/login',
          element: <LoginPage />,
        },
        {
          path: '/register',
          element: <div>Register</div>,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/login" replace />,
    },
  ];

  const router = createBrowserRouter(!token ? publicRoutes : privateRoutes);

  return <RouterProvider router={router} />;
};

export default App;
