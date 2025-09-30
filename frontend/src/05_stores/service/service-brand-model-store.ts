import { create } from 'zustand';
import type { ServiceBrandModel } from '@/04_types/service/service-brand-model';

type ServiceBrandModelStoreProps = {
  selectedServiceBrandModel: ServiceBrandModel | null;
  setSelectedServiceBrandModel: (
    serviceBrandModel: ServiceBrandModel | null,
  ) => void;
};

const useServiceBrandModelStore = create<ServiceBrandModelStoreProps>(set => ({
  selectedServiceBrandModel: null,
  setSelectedServiceBrandModel: serviceBrandModel =>
    set({ selectedServiceBrandModel: serviceBrandModel }),
}));

export default useServiceBrandModelStore;
