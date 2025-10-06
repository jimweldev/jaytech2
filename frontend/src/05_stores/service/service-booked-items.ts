import { create } from 'zustand';

type BookedItem = {
  id: number;
  label: string;
  price: string;
};

type ServiceBookedItemProps = {
  bookedServices: BookedItem[];
  setBookedServices: (services: BookedItem[]) => void;
  clearBookedServices: () => void;
};

const useServiceBookedItem = create<ServiceBookedItemProps>((set) => ({
  bookedServices: [],
  setBookedServices: (services) => set({ bookedServices: services }),
  clearBookedServices: () => set({ bookedServices: [] }),
}));

export default useServiceBookedItem;
