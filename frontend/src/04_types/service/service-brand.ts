import type { ServiceBrandCategory } from './service-brand-category';

export type ServiceBrand = {
  id?: number;
  slug: string;
  label: string;
  thumbnail_path?: string;
  service_brand_categories?: ServiceBrandCategory[];
  created_at?: string;
  updated_at?: string;
  records?: ServiceBrand[];
};
