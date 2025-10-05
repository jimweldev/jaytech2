import type { ServiceBrandModel } from './service-brand-model';
import type { ServiceItem } from './service-item';

export type ServiceBrandModelItem = {
  id?: number;
  service_brand_model_id?: number;
  service_item_id?: number;
  price?: number;
  details?: string;
  service_brand_model?: ServiceBrandModel;
  service_item?: ServiceItem;
  created_at?: string;
  updated_at?: string;
};
