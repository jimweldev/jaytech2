import { create } from 'zustand';
import type { ServiceBooking } from '@/04_types/service/service-booking';

type ServiceBookingProps = {
  selectedServiceBooking: ServiceBooking | null;
  setSelectedServiceBooking: (serviceBooking: ServiceBooking | null) => void;
};

const useServiceBooking = create<ServiceBookingProps>(set => ({
  selectedServiceBooking: null,
  setSelectedServiceBooking: serviceBooking =>
    set({ selectedServiceBooking: serviceBooking }),
}));

export default useServiceBooking;
