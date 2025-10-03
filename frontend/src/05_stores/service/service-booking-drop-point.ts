import { create } from 'zustand';
import type { ServiceBookingDropPoint } from '@/04_types/service/service-booking-drop-point';

type ServiceBookingDropPointStoreProps = {
  selectedServiceBookingDropPoint: ServiceBookingDropPoint | null;
  setSelectedServiceBookingDropPoint: (
    serviceBookingDropPoint: ServiceBookingDropPoint | null,
  ) => void;
};

const useServiceBookingDropPointStore =
  create<ServiceBookingDropPointStoreProps>(set => ({
    selectedServiceBookingDropPoint: null,
    setSelectedServiceBookingDropPoint: serviceBookingDropPoint =>
      set({ selectedServiceBookingDropPoint: serviceBookingDropPoint }),
  }));

export default useServiceBookingDropPointStore;
