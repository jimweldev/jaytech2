import type { ServiceBrandModel } from './service-brand-model';

export type ServiceBrandModelItem = {
  id?: number;
  service_brand_model_id?: number;
  label?: string;
  price?: number;
  details?: string;
  warranty?: string;
  has_appointment?: boolean;
  form_type?: string;
  service_brand_model?: ServiceBrandModel;
  thumbnail_path?: string;
  created_at?: string;
  updated_at?: string;
};
