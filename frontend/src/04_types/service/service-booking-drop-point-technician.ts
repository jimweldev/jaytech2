import type { User } from '../user/user';
import type { Service } from './service';
import type { ServiceBookingDropPoint } from './service-booking-drop-point';

export type ServiceBookingDropPointTechnician = {
  id?: number;
  technician_id?: number;
  service_booking_drop_point_id?: number;
  service_id?: number;
  technician?: User;
  service_booking_drop_point?: ServiceBookingDropPoint;
  service?: Service;
  created_at?: Date;
  updated_at?: Date;
};
