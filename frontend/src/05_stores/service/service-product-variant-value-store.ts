import { create } from 'zustand';
import type { ServiceProductVariantValue } from '@/04_types/service/service-product-variant-value';

type ServiceProductVariantValueStoreProps = {
  selectedServiceProductVariantValue: ServiceProductVariantValue | null;
  setSelectedServiceProductVariantValue: (
    serviceProductVariantValue: ServiceProductVariantValue | null,
  ) => void;
};

const useServiceProductVariantValueStore =
  create<ServiceProductVariantValueStoreProps>(set => ({
    selectedServiceProductVariantValue: null,
    setSelectedServiceProductVariantValue: serviceProductVariantValue =>
      set({
        selectedServiceProductVariantValue: serviceProductVariantValue,
      }),
  }));

export default useServiceProductVariantValueStore;
