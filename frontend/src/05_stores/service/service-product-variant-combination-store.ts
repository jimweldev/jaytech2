import { create } from 'zustand';
import type { ServiceProductVariantCombination } from '@/04_types/service/service-product-variant-combination';

type ServiceProductVariantCombinationStoreProps = {
  selectedServiceProductVariantCombination: ServiceProductVariantCombination | null;
  setSelectedServiceProductVariantCombination: (
    serviceProductVariantCombination: ServiceProductVariantCombination | null,
  ) => void;
};

const useServiceProductVariantCombinationStore =
  create<ServiceProductVariantCombinationStoreProps>(set => ({
    selectedServiceProductVariantCombination: null,
    setSelectedServiceProductVariantCombination:
      serviceProductVariantCombination =>
        set({
          selectedServiceProductVariantCombination:
            serviceProductVariantCombination,
        }),
  }));

export default useServiceProductVariantCombinationStore;
