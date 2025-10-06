import { create } from 'zustand';
import type { ServiceCart } from '@/04_types/service/service-cart';
import { persist } from 'zustand/middleware';

type ServiceCartStoreProps = {
  selectedServiceCart: ServiceCart | null;
  setSelectedServiceCart: (serviceCart: ServiceCart | null) => void;
};

const useServiceCartStore = create<ServiceCartStoreProps>()(
  persist(
    set => ({
      selectedServiceCart: null,
      setSelectedServiceCart: serviceCart =>
        set({ selectedServiceCart: serviceCart }),
    }),
    {
      name: 'service-cart',
    },
  )
);

export default useServiceCartStore;
