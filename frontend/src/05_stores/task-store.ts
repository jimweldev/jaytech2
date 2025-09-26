import { create } from 'zustand';
import type { Pagination } from '@/04_types/_common/pagination';
import type { Task } from '@/04_types/task';
import { createPaginationSlice } from './_slices/pagination-slice';

type TaskStoreProps = {
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
  pagination: Pagination;
};

const useTaskStore = create<TaskStoreProps>((set, get, api) => ({
  selectedTask: null,
  setSelectedTask: task => set({ selectedTask: task }),
  // pagination states
  ...createPaginationSlice(set, get, api),
}));

export default useTaskStore;
