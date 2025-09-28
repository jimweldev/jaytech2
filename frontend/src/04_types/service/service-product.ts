import type { Service } from './service';

export type ServiceProduct = {
  id?: number;
  service_id?: string;
  label?: string;
  description?: string;
  slug?: string;
  service?: Service;
  created_at?: Date;
  updated_at?: Date;
};
