import { create } from 'zustand';
import type { ServiceProduct } from '@/04_types/service/service-product';

type ServiceProductStoreProps = {
  selectedServiceProduct: ServiceProduct | null;
  setSelectedServiceProduct: (serviceProduct: ServiceProduct | null) => void;
};

const useServiceProductStore = create<ServiceProductStoreProps>(set => ({
  selectedServiceProduct: null,
  setSelectedServiceProduct: serviceProduct =>
    set({ selectedServiceProduct: serviceProduct }),
}));

export default useServiceProductStore;
