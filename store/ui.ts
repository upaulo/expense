import { create } from "zustand";

interface UIStore {
	isDatePickerOpen: boolean;
	setIsDatePickerOpen: (value: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
	isDatePickerOpen: false,
	setIsDatePickerOpen: (value) => set({ isDatePickerOpen: value }),
}));
