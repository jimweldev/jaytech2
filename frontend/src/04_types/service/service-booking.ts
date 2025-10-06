import type { ServiceBookingDropPointTechnician } from './service-booking-drop-point-technician';
import type { ServiceBrandModel } from './service-brand-model';

export type ServiceBooking = {
  id?: number;
  customer_id?: number;
  service_brand_model_id?: number;
  service_booking_drop_point_technician_id?: number;
  details?: string;
  status?: string;
  service_brand_model?: ServiceBrandModel;
  service_booking_drop_point_technician?: ServiceBookingDropPointTechnician;
  created_at?: string;
  updated_at?: string;
};
