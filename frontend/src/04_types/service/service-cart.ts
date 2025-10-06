import type { User } from "../user/user";
import type { ServiceBrandModel } from "./service-brand-model";

export type ServiceCart = {
  id?: number;
  customer_id?: number;
  service_brand_model_id?: number;
  details?: string;
  customer?: User;
  service_brand_model?: ServiceBrandModel;
  created_at?: Date;
  updated_at?: Date;
};
