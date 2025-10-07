import { useState } from 'react';
import { useNavigate } from 'react-router';
import useAuthUserStore from '@/05_stores/_common/auth-user-store';
import DataTable from '@/components/data-table/data-table';
import FancyboxViewer from '@/components/fancybox/fancybox-viewer';
import ReactImage from '@/components/image/react-image';
import DataTableGridSkeleton from '@/components/skeleton/data-table-grid-skeleton';
import PageHeader from '@/components/typography/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardBody } from '@/components/ui/card';
import useFancybox from '@/hooks/fancybox/use-fancybox';
import useTanstackPaginateQuery from '@/hooks/tanstack/use-tanstack-paginate-query';
import LoginToContinueShopping from '../_components/login-to-continue-shopping-component';
import DeleteUserCartDialog from './_dialogs/delete-task-dialog';
import type { UserCart } from '@/04_types/user/user-cart';
import useUserCartStore from '@/05_stores/user/user-cart-store';

const CartPage = () => {
  const navigate = useNavigate();
  const [fancyboxRef] = useFancybox();

  // Tanstack query hook for pagination
  const tasksPagination = useTanstackPaginateQuery<UserCart>({
    endpoint: '/services/carts',
    defaultSort: 'created_at',
  });
  const { user } = useAuthUserStore();
  const { setSelectedUserCart } = useUserCartStore();

  const [openDeleteUserCartDialog, setOpenDeleteUserCartDialog] =
    useState(false);

  return (
    <div className="customer-container p-layout">
      <PageHeader className="mb-3">Shopping Cart</PageHeader>

      <Card>
        <CardBody className="flex flex-col gap-3" ref={fancyboxRef}>
          {!user ? (
            <LoginToContinueShopping />
          ) : (
            <DataTable
              pagination={tasksPagination}
              defaultView="grid"
              gridSkeleton={
                <DataTableGridSkeleton count={tasksPagination.limit} />
              }
            >
              {/* Render rows only if data is present */}
              {tasksPagination.data?.records ? (
                <div className="grid gap-2">
                  {tasksPagination.data.records.map(item => (
                    <div key={item.id}>
                      <div className="p-4 flex flex-col md:flex-row md:items-start md:justify-between gap-4 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                        {/* Left Section */}
                        <div className="flex flex-col sm:flex-row flex-1 gap-4">
                          {/* Image */}
                          <FancyboxViewer
                            baseUrl={import.meta.env.VITE_STORAGE_BASE_URL}
                            filePath=""
                            data-fancybox={item.id}
                            data-caption={item.label}
                          >
                            <div className="relative flex size-20 sm:size-24 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50 mx-auto sm:mx-0">
                              <ReactImage
                                className="pointer-events-none h-full w-full object-cover"
                                src={item.image}
                                alt={item.label}
                              />
                            </div>
                          </FancyboxViewer>

                          {/* Details */}
                          <div className="flex flex-col gap-2 min-w-0 text-center sm:text-left">
                            {/* Model Label */}
                            <p className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                              {item.service_brand_model?.label}
                            </p>

                            {/* Service Items */}
                            {item.items?.length > 0 && (
                              <div
                                className="
                                  bg-gray-50 
                                  border border-gray-100 
                                  rounded-lg 
                                  p-2 sm:p-3 
                                  w-full 
                                  max-w-full 
                                  sm:max-w-md 
                                  md:max-w-lg 
                                  lg:max-w-xl 
                                  mx-auto
                                "
                              >
                                {item.items.map((subItem) => (
                                  <div
                                    key={subItem.id}
                                    className="
                                      flex justify-between items-center 
                                      text-xs sm:text-sm 
                                      text-gray-700 
                                      py-1.5 px-2 
                                      hover:bg-gray-100 
                                      rounded-md 
                                      transition
                                    "
                                  >
                                    <span className="font-medium truncate pr-2">
                                      {subItem.model_item?.service_item?.label}
                                    </span>
                                    <span className="text-gray-600 font-semibold shrink-0">
                                      €{Number(subItem.model_item?.price || 0).toLocaleString()}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}


                          </div>
                        </div>

                        {/* Right Section — Buttons */}
                        <div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full sm:w-auto md:w-[130px]">
                          <Button
                            className="w-full text-sm"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setOpenDeleteUserCartDialog(true);
                              setSelectedUserCart(item);
                            }}
                          >
                            Remove
                          </Button>
                          <Button
                            className="w-full text-sm"
                            size="sm"
                            onClick={() => {
                              navigate('/cart/checkout');
                              setSelectedUserCart(item);
                            }}
                          >
                            Checkout
                          </Button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              ) : null}
            </DataTable>
          )}
        </CardBody>
      </Card>

      <DeleteUserCartDialog
        open={openDeleteUserCartDialog}
        setOpen={setOpenDeleteUserCartDialog}
        refetch={tasksPagination.refetch}
      />
    </div>
  );
};

export default CartPage;
