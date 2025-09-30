import { create } from 'zustand';
import type { ServiceBrand } from '@/04_types/service/service-brand';

type ServiceBrandStoreProps = {
  selectedServiceBrand: ServiceBrand | null;
  setSelectedServiceBrand: (serviceBrand: ServiceBrand | null) => void;
};

const useServiceBrandStore = create<ServiceBrandStoreProps>(set => ({
  selectedServiceBrand: null,
  setSelectedServiceBrand: serviceBrand =>
    set({ selectedServiceBrand: serviceBrand }),
}));

export default useServiceBrandStore;
