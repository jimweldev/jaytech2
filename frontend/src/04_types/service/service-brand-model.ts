import type { ServiceBrandCategory } from './service-brand-category';

export type ServiceBrandModel = {
  id?: number;
  service_brand_category_id?: number;
  label?: string;
  thumbnail_path?: string;
  service_brand_category?: ServiceBrandCategory;
  created_at?: Date;
  updated_at?: Date;
};
