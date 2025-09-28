import { create } from 'zustand';
import type { Service } from '@/04_types/service/service';

type ServiceStoreProps = {
  selectedService: Service | null;
  setSelectedService: (service: Service | null) => void;
};

const useServiceStore = create<ServiceStoreProps>(set => ({
  selectedService: null,
  setSelectedService: service => set({ selectedService: service }),
}));

export default useServiceStore;
