import type { Service } from './service';
import type { ServiceBrand } from './service-brand';

export type ServiceBrandCategory = {
  id?: number;
  service_id?: number;
  service_brand_id?: number;
  service?: Service;
  service_brand?: ServiceBrand;
  created_at?: string;
  updated_at?: string;
};
