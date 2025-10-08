import type { ServiceBrandModelItem } from "../service/service-brand-model-item";

export type UserCart = {
  id?: number;
  user_id?: number;
  image?: string;
  label?: string;
  amount?: number;
  created_at?: string;
  updated_at?: string;
  service_brand_model?: ServiceBrandModelItem
};
