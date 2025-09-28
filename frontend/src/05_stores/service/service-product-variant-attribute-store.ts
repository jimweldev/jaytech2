import { create } from 'zustand';
import type { ServiceProductVariantAttribute } from '@/04_types/service/service-product-variant-attribute';

type ServiceProductVariantAttributeStoreProps = {
  selectedServiceProductVariantAttribute: ServiceProductVariantAttribute | null;
  setSelectedServiceProductVariantAttribute: (
    serviceProductVariantAttribute: ServiceProductVariantAttribute | null,
  ) => void;
};

const useServiceProductVariantAttributeStore =
  create<ServiceProductVariantAttributeStoreProps>(set => ({
    selectedServiceProductVariantAttribute: null,
    setSelectedServiceProductVariantAttribute: serviceProductVariantAttribute =>
      set({
        selectedServiceProductVariantAttribute: serviceProductVariantAttribute,
      }),
  }));

export default useServiceProductVariantAttributeStore;
