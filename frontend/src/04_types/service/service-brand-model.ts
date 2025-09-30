import type { ServiceBrand } from './service-brand';

export type ServiceBrandModel = {
  id?: number;
  service_brand_id?: number;
  service_brand_category_id?: number;
  label?: string;
  thumbnail_path?: string;
  service_brand?: ServiceBrand;
  service_brand_category?: any;
  created_at?: Date;
  updated_at?: Date;
};
