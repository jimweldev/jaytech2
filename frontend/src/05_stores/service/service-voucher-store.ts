import { create } from 'zustand';
import type { ServiceVoucher } from '@/04_types/service/service-voucher';

type ServiceVoucherStoreProps = {
  selectedServiceVoucher: ServiceVoucher | null;
  setSelectedServiceVoucher: (serviceVoucher: ServiceVoucher | null) => void;
};

const useServiceVoucherStore = create<ServiceVoucherStoreProps>(set => ({
  selectedServiceVoucher: null,
  setSelectedServiceVoucher: serviceVoucher =>
    set({ selectedServiceVoucher: serviceVoucher }),
}));

export default useServiceVoucherStore;
