import type { User } from '../user/user';
import type { ServiceVoucher } from './service-voucher';

export type ServiceClaimedVoucher = {
  id?: number;
  service_voucher_id?: number;
  customer_id?: number;
  amount?: number;
  service_voucher?: ServiceVoucher;
  customer?: User;
  created_at?: string;
  updated_at?: string;
};
