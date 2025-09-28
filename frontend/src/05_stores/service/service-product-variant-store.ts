import { create } from 'zustand';
import type { ServiceProductVariant } from '@/04_types/service/service-product-variant';

type ServiceProductVariantStoreProps = {
  selectedServiceProductVariant: ServiceProductVariant | null;
  setSelectedServiceProductVariant: (
    serviceProductVariant: ServiceProductVariant | null,
  ) => void;
};

const useServiceProductVariantStore = create<ServiceProductVariantStoreProps>(
  set => ({
    selectedServiceProductVariant: null,
    setSelectedServiceProductVariant: serviceProductVariant =>
      set({ selectedServiceProductVariant: serviceProductVariant }),
  }),
);

export default useServiceProductVariantStore;
