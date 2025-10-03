import { create } from 'zustand';
import type { ServiceBookingDropPointTechnician } from '@/04_types/service/service-booking-drop-point-technician';

type ServiceBookingDropPointTechnicianStoreProps = {
  selectedServiceBookingDropPointTechnician: ServiceBookingDropPointTechnician | null;
  setSelectedServiceBookingDropPointTechnician: (
    serviceBookingDropPointTechnician: ServiceBookingDropPointTechnician | null,
  ) => void;
};

const useServiceBookingDropPointTechnicianStore =
  create<ServiceBookingDropPointTechnicianStoreProps>(set => ({
    selectedServiceBookingDropPointTechnician: null,
    setSelectedServiceBookingDropPointTechnician:
      serviceBookingDropPointTechnician =>
        set({
          selectedServiceBookingDropPointTechnician:
            serviceBookingDropPointTechnician,
        }),
  }));

export default useServiceBookingDropPointTechnicianStore;
