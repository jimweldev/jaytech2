import type { ServiceProductVariantAttribute } from './service-product-variant-attribute';

export type ServiceProductVariantValue = {
  id?: number;
  service_product_variant_attribute_id?: string;
  value?: string;
  display_order?: number;
  service_product_variant_attribute?: ServiceProductVariantAttribute;
  created_at?: Date;
  updated_at?: Date;
};
