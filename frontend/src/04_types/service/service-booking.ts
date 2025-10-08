import type { ServiceBookingDropPointTechnician } from './service-booking-drop-point-technician';
import type { ServiceBrandModel } from './service-brand-model';

export type ServiceBooking = {
  id?: number;
  customer_id?: number;
  service_booking_drop_point_technician_id?: number;
  tracking_number?: string;
  service_brand_id?: number;
  service_brand_model_id?: number;
  service_brand_model_item_id?: number;
  service_brand_other?: string;
  service_brand_model_other?: string;
  service_brand_model_item_other?: string;
  booking_type?: string;
  details?: string;
  status?: string;
  service_brand_model?: ServiceBrandModel;
  service_booking_drop_point_technician?: ServiceBookingDropPointTechnician;
  created_at?: string;
  updated_at?: string;
};
