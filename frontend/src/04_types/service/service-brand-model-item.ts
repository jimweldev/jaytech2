import type { ServiceBrandModel } from './service-brand-model';
import type { ServiceItem } from './service-item';

export type ServiceBrandModelItem = {
  id?: number;
  service_brand_model_id?: number;
  service_item_id?: number;
  price?: number;
  service_brand_model?: ServiceBrandModel;
  service_item?: ServiceItem;
  created_at?: Date;
  updated_at?: Date;
};
