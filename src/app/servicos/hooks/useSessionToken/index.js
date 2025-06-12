import { create } from "zustand";

const useTemSessionToken = create((set) => ({
    temSessionToken: false,
    setTemSessionToken: (valor) => set({ temSessionToken: valor }),
}));

export default useTemSessionToken;