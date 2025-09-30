import type { ServiceBrandCategory } from './service-brand-category';

export type ServiceBrand = {
  id?: number;
  label?: string;
  thumbnail_path?: string;
  categories?: ServiceBrandCategory[];
  created_at?: Date;
  updated_at?: Date;
};
