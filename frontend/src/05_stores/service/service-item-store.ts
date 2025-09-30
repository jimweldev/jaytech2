import { create } from 'zustand';
import type { ServiceItem } from '@/04_types/service/service-item';

type ServiceItemStoreProps = {
  selectedServiceItem: ServiceItem | null;
  setSelectedServiceItem: (serviceItem: ServiceItem | null) => void;
};

const useServiceItemStore = create<ServiceItemStoreProps>(set => ({
  selectedServiceItem: null,
  setSelectedServiceItem: serviceItem =>
    set({ selectedServiceItem: serviceItem }),
}));

export default useServiceItemStore;
