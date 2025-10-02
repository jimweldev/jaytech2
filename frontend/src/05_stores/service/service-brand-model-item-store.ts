import { create } from 'zustand';
import type { ServiceBrandModelItem } from '@/04_types/service/service-brand-model-item';

type ServiceBrandModelItemStoreProps = {
  selectedServiceBrandModelItem: ServiceBrandModelItem | null;
  setSelectedServiceBrandModelItem: (
    serviceBrandModelItem: ServiceBrandModelItem | null,
  ) => void;
};

const useServiceBrandModelItemStore = create<ServiceBrandModelItemStoreProps>(
  set => ({
    selectedServiceBrandModelItem: null,
    setSelectedServiceBrandModelItem: serviceBrandModelItem =>
      set({ selectedServiceBrandModelItem: serviceBrandModelItem }),
  }),
);

export default useServiceBrandModelItemStore;
